import React, { useState, useEffect } from 'react';
import { useZetaChain } from '../context/ZetaChainContext';
import { motion } from 'framer-motion';

const OmnichainDashboard = () => {
  const {
    crossChainBalances,
    isOmnichainConnected,
    connectOmnichain,
    getPortfolioValue,
    executeOmnichainTransaction,
    supportedChains
  } = useZetaChain();

  const [selectedChain, setSelectedChain] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);

  const handleOmnichainTransfer = async () => {
    if (!selectedChain || !transferAmount || !recipientAddress) {
      alert('Please fill all fields');
      return;
    }

    setIsTransferring(true);
    try {
      await executeOmnichainTransaction(selectedChain, transferAmount, recipientAddress);
      alert('Omnichain transfer successful!');
      setTransferAmount('');
      setRecipientAddress('');
    } catch (error) {
      alert('Transfer failed: ' + error.message);
    } finally {
      setIsTransferring(false);
    }
  };

  if (!isOmnichainConnected) {
    return (
      <div className="bg-[#1A3A2C] p-8 rounded-xl text-white border border-[#2C5440] neon-mist">
        <h2 className="text-3xl font-bold mb-4 gradient-text">🌐 OmniVest Dashboard</h2>
        <p className="mb-6">Connect to ZetaChain to access cross-chain investment features</p>
        <button
          onClick={connectOmnichain}
          className="bg-[#2FB574] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#1B7A57] hover:text-white transition-all"
        >
          Connect Omnichain Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1A3A2C] p-6 rounded-xl text-white border border-[#2C5440] neon-mist"
      >
        <h2 className="text-2xl font-bold mb-4 gradient-text">🌐 Omnichain Portfolio</h2>
        <div className="text-3xl font-bold text-[#2FB574]">
          ${getPortfolioValue().toFixed(2)} USD
        </div>
        <p className="text-gray-300">Total value across all chains</p>
      </motion.div>

      {/* Chain Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(crossChainBalances).map(([chainKey, balance]) => (
          <motion.div
            key={chainKey}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A3A2C] p-4 rounded-lg border border-[#2C5440] neon-mist1"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {balance.chainName}
            </h3>
            <div className="text-2xl font-bold text-[#2FB574]">
              {parseFloat(balance.native).toFixed(4)}
            </div>
            <p className="text-gray-400 text-sm">Native Token</p>
            <div className="mt-2 text-sm text-gray-300">
              Chain ID: {balance.chainId}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cross-Chain Transfer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1A3A2C] p-6 rounded-xl border border-[#2C5440] neon-mist"
      >
        <h3 className="text-xl font-bold text-white mb-4">⚡ Cross-Chain Transfer</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-2">Target Chain</label>
            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="w-full p-3 bg-[#0A1F12] text-white rounded-lg border border-[#2C5440] focus:border-[#2FB574] focus:outline-none"
            >
              <option value="">Select Chain</option>
              {Object.entries(supportedChains).map(([key, chain]) => (
                <option key={key} value={key}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Amount</label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="0.0"
              className="w-full p-3 bg-[#0A1F12] text-white rounded-lg border border-[#2C5440] focus:border-[#2FB574] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Recipient Address</label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x..."
              className="w-full p-3 bg-[#0A1F12] text-white rounded-lg border border-[#2C5440] focus:border-[#2FB574] focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleOmnichainTransfer}
          disabled={isTransferring}
          className="w-full bg-[#2FB574] text-black p-3 rounded-lg font-semibold hover:bg-[#1B7A57] hover:text-white transition-all disabled:opacity-50"
        >
          {isTransferring ? 'Processing...' : 'Execute Cross-Chain Transfer'}
        </button>
      </motion.div>

      {/* Features Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-green-800 to-teal-800 p-6 rounded-xl text-white"
        >
          <h3 className="text-xl font-bold mb-3">🔗 Cross-Chain Investments</h3>
          <p className="text-gray-200">
            Invest in projects across multiple blockchains without bridges or wrapped tokens.
            ZetaChain enables seamless omnichain operations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-green-700 to-emerald-700 p-6 rounded-xl text-white"
        >
          <h3 className="text-xl font-bold mb-3">⚡ Instant Settlements</h3>
          <p className="text-gray-200">
            Execute investment transactions that settle instantly across Bitcoin, Ethereum, 
            and other chains through ZetaChain's omnichain architecture.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OmnichainDashboard;