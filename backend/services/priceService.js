import axios from 'axios';

class PriceService {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    async getCryptoPrices() {
        const cacheKey = 'crypto_prices';
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            // Using CoinGecko API for real prices
            const response = await axios.get(
                'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,matic-network,zetachain&vs_currencies=usd'
            );

            const prices = {
                ethereum: response.data.ethereum?.usd || 2500,
                bsc: response.data.binancecoin?.usd || 300,
                polygon: response.data['matic-network']?.usd || 0.8,
                zetachain: response.data.zetachain?.usd || 0.7,
                zetaTestnet: response.data.zetachain?.usd || 0.7
            };

            this.cache.set(cacheKey, {
                data: prices,
                timestamp: Date.now()
            });

            return prices;
        } catch (error) {
            console.error('Error fetching crypto prices:', error);
            // Return fallback prices
            return {
                ethereum: 2500,
                bsc: 300,
                polygon: 0.8,
                zetachain: 0.7,
                zetaTestnet: 0.7
            };
        }
    }

    async convertToUSD(amount, chainKey) {
        const prices = await this.getCryptoPrices();
        const price = prices[chainKey] || 1;
        return parseFloat(amount) * price;
    }
}

export default new PriceService();