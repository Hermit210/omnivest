import React, { createContext, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    const connectWallet = async () => {
        try {
            const web3Modal = new Web3Modal();
            const instance = await web3Modal.connect();

            // SSR safety: only run in browser and if instance is available
            if (typeof window !== 'undefined' && instance) {
                // Ethers v6: use BrowserProvider
                const ethersProvider = new ethers.BrowserProvider(instance);
                const userSigner = await ethersProvider.getSigner();
                const address = await userSigner.getAddress();
                setWalletAddress(address);
                setProvider(ethersProvider);
                setSigner(userSigner);
                console.log(address);
                console.log(ethersProvider);
                console.log(userSigner);
            } else {
                console.log('Ethereum wallet not detected or running on server.');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    const disconnectWallet = () => {
        setWalletAddress('');
        setProvider(null);
        setSigner(null);
    };

    return (
        <WalletContext.Provider
            value={{
                walletAddress,
                provider,
                signer,
                connectWallet,
                disconnectWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};
