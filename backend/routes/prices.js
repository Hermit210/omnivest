import express from 'express';
import priceService from '../services/priceService.js';

const router = express.Router();

// Get current crypto prices
router.get('/', async (req, res) => {
    try {
        const prices = await priceService.getCryptoPrices();
        res.json(prices);
    } catch (error) {
        console.error('Error fetching prices:', error);
        res.status(500).json({ error: 'Failed to fetch prices' });
    }
});

// Convert amount to USD
router.post('/convert', async (req, res) => {
    try {
        const { amount, chainKey } = req.body;
        const usdValue = await priceService.convertToUSD(amount, chainKey);
        res.json({ usdValue });
    } catch (error) {
        console.error('Error converting to USD:', error);
        res.status(500).json({ error: 'Failed to convert to USD' });
    }
});

export default router;