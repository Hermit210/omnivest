import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OmnichainDashboard from '../components/OmnichainDashboard';
import { useZetaChain } from '../context/ZetaChainContext';

const OmniVest = () => {
  const { isOmnichainConnected, getPortfolioValue, crossChainBalances, userInvestments, zetaSigner, fetchCrossChainBalances, supportedChains } = useZetaChain();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking', 'connected', 'disconnected'

  // Check backend status on component mount
  React.useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/debug');
        if (response.ok) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('disconnected');
        }
      } catch (error) {
        setBackendStatus('disconnected');
      }
    };
    
    checkBackend();
  }, []);

  // Test backend connectivity
  const testBackend = async () => {
    try {
      console.log('Testing backend connection...');
      const response = await fetch('http://localhost:8000/api/debug');
      const data = await response.json();
      console.log('Backend test successful:', data);
      alert('✅ Backend is working!\n' + data.message);
    } catch (error) {
      console.error('Backend test failed:', error);
      alert('❌ Backend connection failed!\nMake sure the backend server is running on port 8000.\nError: ' + error.message);
    }
  };

  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedChain, setSelectedChain] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);

  const handleInvestmentClick = (investment) => {
    setSelectedInvestment(investment);
    setInvestmentAmount('');
    setSelectedChain('');
  };

  const executeInvestment = async () => {
    if (!zetaSigner) {
      alert('Please connect your wallet first');
      return;
    }

    if (!investmentAmount || !selectedChain) {
      alert('Please enter investment amount and select a chain');
      return;
    }

    setIsInvesting(true);
    try {
      console.log('Starting omnichain investment process for:', selectedInvestment.name);
      const address = await zetaSigner.getAddress();
      console.log('Wallet address:', address);
      
      // Get chain info from supported chains
      const chainInfo = Object.values(supportedChains).find(chain => chain.name === selectedChain);
      
      const investmentData = {
        walletAddress: address,
        projectName: selectedInvestment.name,
        chainId: chainInfo?.chainId || 7001,
        chainName: selectedChain,
        initialAmount: parseFloat(investmentAmount),
        tokenSymbol: chainInfo?.chainId === 1 ? 'ETH' : chainInfo?.chainId === 56 ? 'BNB' : chainInfo?.chainId === 137 ? 'MATIC' : 'ZETA',
        transactionHash: '0x' + Math.random().toString(16).substring(2, 66),
        expectedAPY: parseFloat(selectedInvestment.apy.replace('%', ''))
      };
      
      console.log('Omnichain investment data:', investmentData);
      
      // Simulate cross-chain transaction via ZetaChain
      const response = await fetch('http://localhost:8000/api/investments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(investmentData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Omnichain investment created:', result);
        alert(`🌐 Successfully invested ${investmentAmount} ${investmentData.tokenSymbol} in ${selectedInvestment.name} via ${selectedChain}!\n\n✅ Cross-chain transaction completed\n🔗 Transaction Hash: ${investmentData.transactionHash.substring(0, 10)}...`);
        
        // Refresh portfolio data
        if (zetaSigner) {
          await fetchCrossChainBalances(zetaSigner);
        }
        
        // Close modal
        setSelectedInvestment(null);
      } else {
        const errorData = await response.json();
        throw new Error(`Investment failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Omnichain investment failed:', error);
      alert('❌ Cross-chain investment failed: ' + error.message);
    } finally {
      setIsInvesting(false);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'investments', label: 'Cross-Chain Investments', icon: '💰' },
    { id: 'portfolio', label: 'Omni Portfolio', icon: '🌐' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  const omnichainInvestments = [
    {
      id: 1,
      name: 'ZetaChain Omnichain Liquidity Pool',
      description: 'Provide liquidity across Bitcoin, Ethereum, and BSC simultaneously through ZetaChain\'s native omnichain architecture',
      chains: ['Bitcoin', 'Ethereum', 'BSC', 'ZetaChain'],
      totalValue: '$2.4M',
      apy: '15.8%',
      status: 'Active',
      minInvestment: 0.01,
      riskLevel: 'Medium',
      category: 'Liquidity Mining'
    },
    {
      id: 2,
      name: 'Cross-Chain Bitcoin DeFi Vault',
      description: 'First-ever Bitcoin DeFi vault that works natively without wrapping, powered by ZetaChain\'s omnichain smart contracts',
      chains: ['Bitcoin', 'ZetaChain', 'Ethereum'],
      totalValue: '$1.8M',
      apy: '22.3%',
      status: 'Active',
      minInvestment: 0.001,
      riskLevel: 'High',
      category: 'Bitcoin DeFi'
    },
    {
      id: 3,
      name: 'Omnichain Yield Aggregator',
      description: 'Automatically finds the best yields across all chains and rebalances your portfolio using ZetaChain\'s cross-chain messaging',
      chains: ['Ethereum', 'Polygon', 'BSC', 'ZetaChain'],
      totalValue: '$3.1M',
      apy: '18.7%',
      status: 'Active',
      minInvestment: 0.1,
      riskLevel: 'Medium',
      category: 'Yield Farming'
    },
    {
      id: 4,
      name: 'Universal Gas Token Pool',
      description: 'Earn fees by providing gas tokens for cross-chain transactions. Users pay gas on any chain, you earn rewards',
      chains: ['All Supported Chains'],
      totalValue: '$892K',
      apy: '12.4%',
      status: 'Active',
      minInvestment: 0.05,
      riskLevel: 'Low',
      category: 'Infrastructure'
    },
    {
      id: 5,
      name: 'Cross-Chain Governance Fund',
      description: 'Participate in governance across multiple DAOs simultaneously and earn voting rewards from all chains',
      chains: ['Ethereum', 'Polygon', 'Arbitrum', 'ZetaChain'],
      totalValue: '$1.2M',
      apy: '9.8%',
      status: 'Active',
      minInvestment: 0.2,
      riskLevel: 'Low',
      category: 'Governance'
    },
    {
      id: 6,
      name: 'Omnichain NFT Royalty Fund',
      description: 'Invest in NFT royalties across all major chains. ZetaChain enables seamless royalty collection from any blockchain',
      chains: ['Ethereum', 'Polygon', 'BSC', 'Solana'],
      totalValue: '$654K',
      apy: '14.2%',
      status: 'Coming Soon',
      minInvestment: 0.5,
      riskLevel: 'High',
      category: 'NFTs'
    }
  ];

  return (
    <div className="min-h-screen bg-[#05140D] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center mb-6">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 7.5C22.5 12 18 18 18 27C18 36 22.5 42 30 52.5C37.5 42 42 36 42 27C42 18 37.5 12 30 7.5Z" fill="#2FB574"/>
              <rect x="27" y="48" width="6" height="4.5" fill="#2FB574"/>
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">
            OmniVest
          </h1>
          <p className="text-2xl font-bold mb-2 text-white">
            Cross-Chain Investment Platform
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Invest across multiple blockchains from a single platform. Powered by ZetaChain's omnichain technology.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-black/20 backdrop-blur-sm p-2 rounded-2xl flex space-x-2 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl transition-all font-bold ${
                  activeTab === tab.id
                    ? 'bg-[#2FB574] text-black shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <OmnichainDashboard />}
          
          {activeTab === 'investments' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Cross-Chain Investment Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {omnichainInvestments.map((investment) => (
                  <motion.div
                    key={investment.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#00D2FF]/50 transition-all shadow-2xl"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white">{investment.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        investment.riskLevel === 'Low' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        investment.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {investment.riskLevel} Risk
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">{investment.description}</p>
                    
                    <div className="mb-6">
                      <p className="text-gray-400 mb-3 font-semibold">Universal Chain Support:</p>
                      <div className="flex flex-wrap gap-2">
                        {investment.chains.map((chain) => (
                          <span
                            key={chain}
                            className="bg-[#2FB574]/20 text-[#2FB574] px-3 py-1 rounded-full text-sm font-bold border border-[#2FB574]/30"
                          >
                            {chain}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <span className="text-gray-400 text-sm">Total Value Locked</span>
                        <div className="font-bold text-white text-xl">{investment.totalValue}</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <span className="text-gray-400 text-sm">Annual Yield</span>
                        <div className="font-bold text-white text-xl">{investment.apy}</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <span className="text-gray-400 text-sm">Minimum</span>
                        <div className="font-bold text-white">{investment.minInvestment} ETH</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <span className="text-gray-400 text-sm">Category</span>
                        <div className="font-bold text-white">{investment.category}</div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleInvestmentClick(investment)}
                      disabled={investment.status !== 'Active'}
                      className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                        investment.status === 'Active' 
                          ? 'bg-[#2FB574] text-black hover:scale-105 shadow-lg' 
                          : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {investment.status === 'Active' ? 'Start Building →' : `${investment.status}`}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white text-center">Universal Portfolio Analytics</h2>
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center bg-white/5 p-6 rounded-xl border border-white/10">
                    <div className="text-4xl font-bold text-white">${getPortfolioValue().toFixed(2)}</div>
                    <p className="text-gray-300 font-semibold mt-2">Total Universal Value</p>
                  </div>
                  <div className="text-center bg-white/5 p-6 rounded-xl border border-white/10">
                    <div className="text-4xl font-bold text-white">{Object.keys(crossChainBalances).length}</div>
                    <p className="text-gray-300 font-semibold mt-2">Connected Chains</p>
                  </div>
                  <div className="text-center bg-white/5 p-6 rounded-xl border border-white/10">
                    <div className="text-4xl font-bold text-white">{userInvestments.length}</div>
                    <p className="text-gray-300 font-semibold mt-2">Universal Apps</p>
                  </div>
                </div>
                <div className="h-64 bg-black/20 rounded-2xl flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-gray-300 font-semibold">Universal Portfolio Performance</p>
                    <p className="text-gray-400 text-sm">Real-time analytics across all chains</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 gradient-text">Cross-Chain Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1A3A2C] p-6 rounded-xl border border-[#2C5440] neon-mist1">
                  <h3 className="text-xl font-bold mb-4">Chain Distribution</h3>
                  <div className="space-y-3">
                    {Object.entries(crossChainBalances).map(([chainKey, balance], index) => {
                      const totalValue = Object.values(crossChainBalances).reduce((sum, b) => sum + (b.usdValue || 0), 0);
                      const percentage = totalValue > 0 ? ((balance.usdValue || 0) / totalValue * 100) : 0;
                      const colors = ['#2FB574', '#95ffb9', '#1B7A57'];
                      
                      return (
                        <div key={chainKey} className="flex justify-between items-center">
                          <span>{balance.chainName}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-[#0A1F12] rounded-full h-2">
                              <div 
                                className="h-2 rounded-full" 
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: colors[index % colors.length]
                                }}
                              ></div>
                            </div>
                            <span>{percentage.toFixed(1)}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-[#1A3A2C] p-6 rounded-xl border border-[#2C5440] neon-mist1">
                  <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
                  <div className="space-y-3">
                    {userInvestments.slice(0, 3).map((investment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-[#0A1F12] rounded border border-[#2C5440]">
                        <div>
                          <p className="font-semibold">{investment.projectName}</p>
                          <p className="text-sm text-gray-400">{investment.chainName} • {investment.status}</p>
                        </div>
                        <span className="text-[#2FB574] font-bold">${investment.initialAmount}</span>
                      </div>
                    ))}
                    {userInvestments.length === 0 && (
                      <div className="text-center text-gray-400 py-4">
                        No investments yet. Start investing to see your portfolio!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* ZetaChain Resources Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-[#1A3A2C] p-6 rounded-xl border border-[#2C5440] text-center max-w-4xl mx-auto"
        >
          <div className="mb-4">
            <div className="inline-block bg-[#2FB574] p-2 rounded-lg mb-3">
              <span className="text-xl font-bold text-black">Z</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Powered by ZetaChain</h3>
            <p className="text-gray-300">Omnichain Technology</p>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Built on ZetaChain's omnichain architecture for seamless cross-chain operations.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://labs.zetachain.com/get-zeta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2FB574] text-black px-4 py-2 rounded-lg font-bold hover:scale-105 transition-transform text-sm"
            >
              Get Testnet ZETA
            </a>
            <a
              href="https://docs.zetachain.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-4 py-2 rounded-lg font-bold hover:bg-white hover:text-black transition-all text-sm"
            >
              Documentation
            </a>
            <a
              href="https://athens.explorer.zetachain.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-400 text-gray-300 px-4 py-2 rounded-lg font-bold hover:border-white hover:text-white transition-all text-sm"
            >
              Explorer
            </a>
            <a
              href="https://hub.zetachain.com/ecosystem"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-400 text-gray-300 px-4 py-2 rounded-lg font-bold hover:border-white hover:text-white transition-all text-sm"
            >
              Ecosystem
            </a>
          </div>
        </motion.div>
      </div>

      {/* Investment Modal */}
      {selectedInvestment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-white/20 max-w-md w-full shadow-2xl"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">{selectedInvestment.name}</h3>
              <button 
                onClick={() => setSelectedInvestment(null)}
                className="text-gray-400 hover:text-white text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Investment Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder={`Min: ${selectedInvestment.minInvestment} ETH`}
                    min={selectedInvestment.minInvestment}
                    step="0.01"
                    className="w-full p-4 bg-white/5 text-white rounded-xl border border-white/20 focus:border-[#00D2FF] focus:outline-none backdrop-blur-sm"
                  />
                  <span className="absolute right-3 top-3 text-gray-400">ETH</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Select Chain for Investment</label>
                <select
                  value={selectedChain}
                  onChange={(e) => setSelectedChain(e.target.value)}
                  className="w-full p-4 bg-white/5 text-white rounded-xl border border-white/20 focus:border-[#00D2FF] focus:outline-none backdrop-blur-sm"
                >
                  <option value="">Choose Chain</option>
                  {Object.values(supportedChains).map((chain) => (
                    <option key={chain.chainId} value={chain.name}>
                      {chain.name} (Chain ID: {chain.chainId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                <h4 className="font-bold mb-4 text-white text-lg">Universal Investment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Expected APY:</span>
                    <span className="text-[#00D2FF] font-bold">{selectedInvestment.apy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Level:</span>
                    <span className={
                      selectedInvestment.riskLevel === 'Low' ? 'text-green-400' :
                      selectedInvestment.riskLevel === 'Medium' ? 'text-yellow-400' :
                      'text-red-400'
                    }>{selectedInvestment.riskLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{selectedInvestment.category}</span>
                  </div>
                  {investmentAmount && (
                    <div className="flex justify-between border-t border-white/20 pt-3 mt-3">
                      <span>Est. Annual Return:</span>
                      <span className="text-[#00D2FF] font-bold">
                        {(parseFloat(investmentAmount) * parseFloat(selectedInvestment.apy) / 100).toFixed(4)} ETH
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedInvestment(null)}
                  className="flex-1 p-4 border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={executeInvestment}
                  disabled={!investmentAmount || !selectedChain || isInvesting || parseFloat(investmentAmount) < selectedInvestment.minInvestment}
                  className="flex-1 p-4 bg-gradient-to-r from-[#00D2FF] to-[#3A7BD5] text-white rounded-xl font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isInvesting ? 'Building...' : 'Start Building →'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OmniVest;