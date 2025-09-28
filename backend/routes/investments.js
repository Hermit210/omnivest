import express from 'express';
import Investment from '../models/Investment.js';
import fallbackStorage from '../utils/fallbackStorage.js';

const router = express.Router();

// Test endpoint
router.get('/test', (req, res) => {
    const dbStatus = req.app.locals.dbConnected();
    res.json({ 
        message: 'Investment API is working!', 
        timestamp: new Date(),
        database: dbStatus ? 'MongoDB Connected' : 'Fallback Mode',
        storage: dbStatus ? 'database' : 'memory'
    });
});

// Get user investments by wallet address
router.get('/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const dbConnected = req.app.locals.dbConnected();
        
        let investments;
        
        if (dbConnected) {
            // Use MongoDB
            const dbInvestments = await Investment.find({ 
                walletAddress: address.toLowerCase() 
            }).sort({ createdAt: -1 });

            investments = dbInvestments.map(investment => {
                const growthRate = Math.random() * 0.4 - 0.1;
                const currentValue = investment.initialAmount * (1 + growthRate);
                
                return {
                    ...investment.toObject(),
                    currentValue,
                    profitLoss: currentValue - investment.initialAmount,
                    profitLossPercentage: ((currentValue - investment.initialAmount) / investment.initialAmount) * 100
                };
            });
        } else {
            // Use fallback storage
            investments = await fallbackStorage.getInvestmentsByAddress(address);
        }

        res.json(investments);
    } catch (error) {
        console.error('Error fetching investments:', error);
        res.status(500).json({ error: 'Failed to fetch investments' });
    }
});

// Create new investment
router.post('/', async (req, res) => {
    try {
        console.log('📥 Received investment request:', req.body);
        
        const {
            walletAddress,
            projectName,
            chainId,
            chainName,
            initialAmount,
            tokenSymbol,
            transactionHash,
            expectedAPY
        } = req.body;

        // Validate required fields
        if (!walletAddress || !projectName || !chainId || !chainName || !initialAmount || !transactionHash) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                required: ['walletAddress', 'projectName', 'chainId', 'chainName', 'initialAmount', 'transactionHash']
            });
        }

        const investmentData = {
            walletAddress: walletAddress.toLowerCase(),
            projectName,
            chainId,
            chainName,
            initialAmount,
            tokenSymbol: tokenSymbol || 'ETH',
            transactionHash,
            expectedAPY: expectedAPY || 0,
            status: 'active'
        };

        const dbConnected = req.app.locals.dbConnected();
        let investment;

        if (dbConnected) {
            // Use MongoDB
            console.log('💾 Using MongoDB database');
            investment = new Investment(investmentData);
            await investment.save();
            console.log('✅ Investment saved to MongoDB');
        } else {
            // Use fallback storage
            console.log('🔄 Using fallback memory storage');
            investment = await fallbackStorage.createInvestment(investmentData);
            console.log('✅ Investment saved to memory');
        }
        
        res.status(201).json({
            message: 'Investment created successfully',
            investment,
            storage: dbConnected ? 'database' : 'memory'
        });
    } catch (error) {
        console.error('❌ Error creating investment:', error);
        res.status(500).json({ 
            error: 'Failed to create investment',
            details: error.message 
        });
    }
});

// Update investment status
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, currentAmount } = req.body;

        const investment = await Investment.findByIdAndUpdate(
            id,
            { 
                status,
                currentAmount,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!investment) {
            return res.status(404).json({ error: 'Investment not found' });
        }

        res.json(investment);
    } catch (error) {
        console.error('Error updating investment:', error);
        res.status(500).json({ error: 'Failed to update investment' });
    }
});

// Get portfolio summary
router.get('/portfolio/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const dbConnected = req.app.locals.dbConnected();
        
        let investments;
        
        if (dbConnected) {
            investments = await Investment.find({ 
                walletAddress: address.toLowerCase(),
                status: 'active'
            });
        } else {
            const allInvestments = await fallbackStorage.getInvestmentsByAddress(address);
            investments = allInvestments.filter(inv => inv.status === 'active');
        }

        const totalInvested = investments.reduce((sum, inv) => sum + inv.initialAmount, 0);
        const totalCurrentValue = investments.reduce((sum, inv) => {
            const growthRate = Math.random() * 0.4 - 0.1;
            return sum + (inv.initialAmount * (1 + growthRate));
        }, 0);

        const chainDistribution = {};
        investments.forEach(inv => {
            if (!chainDistribution[inv.chainName]) {
                chainDistribution[inv.chainName] = 0;
            }
            chainDistribution[inv.chainName] += inv.initialAmount;
        });

        res.json({
            totalInvested,
            totalCurrentValue,
            totalProfitLoss: totalCurrentValue - totalInvested,
            totalProfitLossPercentage: totalInvested > 0 ? ((totalCurrentValue - totalInvested) / totalInvested) * 100 : 0,
            chainDistribution,
            totalInvestments: investments.length,
            storage: dbConnected ? 'database' : 'memory'
        });
    } catch (error) {
        console.error('Error fetching portfolio summary:', error);
        res.status(500).json({ error: 'Failed to fetch portfolio summary' });
    }
});

export default router;