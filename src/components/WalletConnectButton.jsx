// WalletConnectButton.jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';

const truncate = (addr = '') => {
    if (!addr) return '';
    return addr.slice(0, 6) + '...' + addr.slice(-4);
};

const WalletConnectButton = () => {
    const [ethersProvider, setEthersProvider] = useState(null);
    const [wcProvider, setWcProvider] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        // cleanup on unmount
        return () => {
            if (wcProvider && wcProvider.disconnect) {
                try {
                    wcProvider.removeAllListeners && wcProvider.removeAllListeners();
                } catch (e) {
                    // ignore
                }
            }
        };
    }, [wcProvider]);

    const connectWallet = async () => {
        try {
            if (typeof window === 'undefined') return;

            const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
            if (!projectId) {
                console.error('Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID');
                alert('WalletConnect is not configured: missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID');
                return;
            }

            // Initialize WalletConnect v2 provider
            const provider = await EthereumProvider.init({
                projectId,
                chains: [1], // adjust supported chain ids as needed (1 = Ethereum mainnet)
                showQrModal: true,
            });

<<<<<<< Updated upstream
            const instance = await web3Modal.connect();
            const ethersProvider = new ethers.BrowserProvider(instance);
            setProvider(ethersProvider);
        } catch (error) {
            console.error("Failed to connect to wallet:", error);
=======
            // Connect (shows QR modal / deep-link)
            await provider.connect();

            // Wrap with ethers BrowserProvider (ethers v6)
            const eProvider = new ethers.BrowserProvider(provider);
            setEthersProvider(eProvider);
            setWcProvider(provider);

            // Get accounts/address
            let acct;
            try {
                const signer = await eProvider.getSigner();
                acct = await signer.getAddress();
            } catch (e) {
                // Fallback: request accounts directly from provider
                try {
                    const accounts = await provider.request({ method: 'eth_requestAccounts' });
                    acct = accounts && accounts[0];
                } catch (e2) {
                    console.error('Failed to get account', e2);
                }
            }

            if (acct) setAddress(acct);

            // Listen for account or chain changes
            provider.on && provider.on('accountsChanged', (accounts) => {
                if (!accounts || accounts.length === 0) {
                    setAddress(null);
                } else {
                    setAddress(accounts[0]);
                }
            });

            provider.on && provider.on('disconnect', (code, reason) => {
                console.log('Wallet disconnected', code, reason);
                setEthersProvider(null);
                setWcProvider(null);
                setAddress(null);
            });
        } catch (err) {
            console.error('Wallet connect failed', err);
            alert('Failed to connect wallet. Check console for details.');
>>>>>>> Stashed changes
        }
    };

    const disconnectWallet = async () => {
        try {
            if (wcProvider && wcProvider.disconnect) {
                await wcProvider.disconnect();
            }
        } catch (err) {
            console.warn('Error during disconnect', err);
        } finally {
            setEthersProvider(null);
            setWcProvider(null);
            setAddress(null);
        }
    };

    if (address) {
        return (
            <div className="flex items-center space-x-3">
                <div className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md">{truncate(address)}</div>
                <button
                    onClick={disconnectWallet}
                    className=" text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={connectWallet}
            className=" bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            Connect Wallet
        </button>
    );
};

export default WalletConnectButton;
