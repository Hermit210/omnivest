import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAddress } from '@zetachain/protocol-contracts';
import { ethers } from 'ethers';

const ZetaChainContext = createContext();

export const useZetaChain = () => {
    const context = useContext(ZetaChainContext);
    if (!context) {
        throw new Error('useZetaChain must be used within a ZetaChainProvider');
    }
    return context;
};

export const ZetaChainProvider = ({ children }) => {
    const [zetaProvider, setZetaProvider] = useState(null);
    const [zetaSigner, setZetaSigner] = useState(null);
    const [connectedChains, setConnectedChains] = useState([]);
    const [crossChainBalances, setCrossChainBalances] = useState({});
    const [userInvestments, setUserInvestments] = useState([]);
    const [totalPortfolioUSD, setTotalPortfolioUSD] = useState(0);
    const [isOmnichainConnected, setIsOmnichainConnected] = useState(false);

    // Supported chains for omnichain operations
    const supportedChains = {
        ethereum: { chainId: 1, name: 'Ethereum', rpc: 'https://eth.llamarpc.com' },
        bsc: { chainId: 56, name: 'BSC', rpc: 'https://bsc-dataseed.binance.org' },
        polygon: { chainId: 137, name: 'Polygon', rpc: 'https://polygon-rpc.com' },
        zetachain: { chainId: 7000, name: 'ZetaChain Mainnet', rpc: 'https://zetachain-evm.blockpi.network/v1/rpc/public' },
        zetaTestnet: { chainId: 7001, name: 'ZetaChain Athens Testnet', rpc: 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public' }
    };

    const connectOmnichain = async () => {
        try {
            if (!window.ethereum) {
                throw new Error('MetaMask not found');
            }

            // Connect to ZetaChain testnet first using ethers v6 BrowserProvider
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);

            const signer = await provider.getSigner();
            setZetaProvider(provider);
            setZetaSigner(signer);

            // Switch to ZetaChain testnet
            await switchToZetaChain();

            setIsOmnichainConnected(true);
            await fetchCrossChainBalances(signer);

            console.log('Omnichain connection established');
        } catch (error) {
            console.error('Error connecting to omnichain:', error);
            throw error;
        }
    };

    const switchToZetaChain = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x1B59' }], // ZetaChain Athens Testnet
            });
        } catch (switchError) {
            // Chain not added, add it
            if (switchError.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x1B59',
                        chainName: 'ZetaChain Athens Testnet',
                        nativeCurrency: {
                            name: 'ZETA',
                            symbol: 'ZETA',
                            decimals: 18,
                        },
                        rpcUrls: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'],
                        blockExplorerUrls: ['https://athens.explorer.zetachain.com/'],
                    }],
                });
            }
        }
    };

    const fetchCrossChainBalances = async (signer) => {
        const balances = {};
        const address = await signer.getAddress();
        let totalUSD = 0;

        // Fetch real balances from multiple chains
        for (const [chainKey, chainInfo] of Object.entries(supportedChains)) {
            try {
                const provider = new ethers.JsonRpcProvider(chainInfo.rpc);
                const balance = await provider.getBalance(address);
                const formattedBalance = ethers.utils.formatEther(balance);
                const usdValue = await convertToUSD(formattedBalance, chainKey);

                balances[chainKey] = {
                    native: formattedBalance,
                    chainName: chainInfo.name,
                    chainId: chainInfo.chainId,
                    usdValue: usdValue
                };

                totalUSD += usdValue;
            } catch (error) {
                console.error(`Error fetching balance for ${chainInfo.name}:`, error);
                balances[chainKey] = {
                    native: '0',
                    chainName: chainInfo.name,
                    chainId: chainInfo.chainId,
                    usdValue: 0
                };
            }
        }

        setCrossChainBalances(balances);

        // Fetch investment data from backend
        const investmentValue = await fetchUserInvestments(address);
        setTotalPortfolioUSD(totalUSD + investmentValue);
    };

    const convertToUSD = async (balance, chainKey) => {
        try {
            const response = await fetch('http://localhost:8000/api/prices/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: balance, chainKey })
            });

            if (response.ok) {
                const data = await response.json();
                return data.usdValue;
            }

            // Fallback prices if API fails
            const fallbackPrices = {
                ethereum: 2500,
                bsc: 300,
                polygon: 0.8,
                zetachain: 0.7,
                zetaTestnet: 0.7
            };

            const price = fallbackPrices[chainKey] || 1;
            return parseFloat(balance) * price;
        } catch (error) {
            console.error('Error converting to USD:', error);
            // Use fallback calculation
            const fallbackPrices = {
                ethereum: 2500,
                bsc: 300,
                polygon: 0.8,
                zetachain: 0.7,
                zetaTestnet: 0.7
            };

            const price = fallbackPrices[chainKey] || 1;
            return parseFloat(balance) * price;
        }
    };

    const fetchUserInvestments = async (address) => {
        try {
            const response = await fetch(`http://localhost:8000/api/investments/${address}`);
            if (response.ok) {
                const investments = await response.json();
                setUserInvestments(investments);

                // Calculate total investment value
                const totalInvestmentValue = investments.reduce((sum, inv) => sum + (inv.currentValue || 0), 0);
                return totalInvestmentValue;
            }
            return 0;
        } catch (error) {
            console.error('Error fetching user investments:', error);
            return 0;
        }
    };

    const executeOmnichainTransaction = async (targetChain, amount, recipient) => {
        try {
            if (!zetaSigner) throw new Error('Not connected to ZetaChain');

            // This is a simplified omnichain transaction
            // In a real implementation, you'd use ZetaChain's cross-chain messaging
            const tx = await zetaSigner.sendTransaction({
                to: recipient,
                value: ethers.utils.parseEther(amount.toString()),
                // Add ZetaChain specific parameters for cross-chain execution
            });

            await tx.wait();

            // Refresh balances after transaction
            await fetchCrossChainBalances(zetaSigner);

            return tx;
        } catch (error) {
            console.error('Omnichain transaction failed:', error);
            throw error;
        }
    };

    const getPortfolioValue = () => {
        return totalPortfolioUSD;
    };

    const getPortfolioValueInTokens = () => {
        let totalValue = 0;
        Object.values(crossChainBalances).forEach(balance => {
            totalValue += parseFloat(balance.native) || 0;
        });
        return totalValue;
    };

    const value = {
        zetaProvider,
        zetaSigner,
        connectedChains,
        crossChainBalances,
        userInvestments,
        totalPortfolioUSD,
        isOmnichainConnected,
        supportedChains,
        connectOmnichain,
        switchToZetaChain,
        fetchCrossChainBalances,
        executeOmnichainTransaction,
        getPortfolioValue,
        getPortfolioValueInTokens
    };

    return (
        <ZetaChainContext.Provider value={value}>
            {children}
        </ZetaChainContext.Provider>
    );
};