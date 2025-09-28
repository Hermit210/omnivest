// Fallback in-memory storage for demo when database is not available
class FallbackStorage {
    constructor() {
        this.investments = new Map();
        this.nextId = 1;
    }

    async createInvestment(investmentData) {
        const investment = {
            _id: this.nextId++,
            ...investmentData,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const key = `${investmentData.walletAddress}_${investment._id}`;
        this.investments.set(key, investment);
        
        console.log(`💾 Stored investment in memory: ${investment.projectName}`);
        return investment;
    }

    async getInvestmentsByAddress(walletAddress) {
        const userInvestments = [];
        
        for (const [key, investment] of this.investments.entries()) {
            if (key.startsWith(walletAddress.toLowerCase())) {
                // Simulate growth/loss for demo
                const growthRate = Math.random() * 0.4 - 0.1; // -10% to +30%
                const currentValue = investment.initialAmount * (1 + growthRate);
                
                userInvestments.push({
                    ...investment,
                    currentValue,
                    profitLoss: currentValue - investment.initialAmount,
                    profitLossPercentage: ((currentValue - investment.initialAmount) / investment.initialAmount) * 100
                });
            }
        }
        
        return userInvestments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    async updateInvestment(id, updateData) {
        for (const [key, investment] of this.investments.entries()) {
            if (investment._id === id) {
                const updated = { ...investment, ...updateData, updatedAt: new Date() };
                this.investments.set(key, updated);
                return updated;
            }
        }
        return null;
    }

    getStats() {
        return {
            totalInvestments: this.investments.size,
            storageType: 'memory'
        };
    }
}

export default new FallbackStorage();