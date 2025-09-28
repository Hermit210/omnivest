import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WhatIsOmniVest = () => {
  return (
    <section className="py-20 bg-[#05140D]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold text-white mb-8">
            About OmniVest
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            OmniVest is a cross-chain investment platform built on ZetaChain's omnichain architecture. 
            It enables investors to access opportunities across multiple blockchains including Bitcoin, Ethereum, BSC, and Polygon 
            through a unified interface with simplified cross-chain operations.
          </p>
          
          <div className="bg-[#1A3A2C] p-8 rounded-2xl border border-[#2C5440] max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-xl font-bold text-[#2FB574] mb-3">Cross-Chain Access:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Multi-blockchain connectivity</li>
                  <li>• Unified investment interface</li>
                  <li>• Simplified cross-chain operations</li>
                  <li>• Real-time portfolio tracking</li>
                  <li>• Comprehensive analytics</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#2FB574] mb-3">Technical Benefits:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• ZetaChain omnichain infrastructure</li>
                  <li>• Secure smart contract architecture</li>
                  <li>• Efficient transaction processing</li>
                  <li>• Professional-grade security</li>
                  <li>• Scalable platform design</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            How OmniVest Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A3A2C] p-8 rounded-2xl border border-[#2C5440] text-center">
              <div className="text-6xl mb-6">🔗</div>
              <h3 className="text-2xl font-bold text-white mb-4">1. Connect Once</h3>
              <p className="text-white font-semibold leading-relaxed">
                Connect your wallet to ZetaChain and instantly access all supported blockchains. 
                No need to switch networks or manage multiple wallets.
              </p>
            </div>
            
            <div className="bg-[#1A3A2C] p-8 rounded-2xl border border-[#2C5440] text-center">
              <div className="text-6xl mb-6">💰</div>
              <h3 className="text-2xl font-bold text-white mb-4">2. Invest Anywhere</h3>
              <p className="text-white font-semibold leading-relaxed">
                Choose from Bitcoin DeFi, Ethereum yield farms, BSC liquidity pools, 
                and cross-chain opportunities — all from one interface.
              </p>
            </div>
            
            <div className="bg-[#1A3A2C] p-8 rounded-2xl border border-[#2C5440] text-center">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-bold text-white mb-4">3. Track Everything</h3>
              <p className="text-white font-semibold leading-relaxed">
                Monitor all your investments across every blockchain in one unified dashboard. 
                Real-time performance, yields, and portfolio analytics.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            Real-World Use Cases
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A3A2C] p-8 rounded-2xl border border-[#2C5440]">
              <h3 className="text-2xl font-bold text-white mb-4">₿ Bitcoin DeFi Pioneer</h3>
              <p className="text-white font-semibold mb-4">
                "I've been holding Bitcoin for years but couldn't participate in DeFi without wrapping it. 
                OmniVest lets me use my real Bitcoin in yield farming and liquidity pools while keeping it native."
              </p>
              <div className="text-[#2FB574] font-bold">— Sarah, Bitcoin Maximalist</div>
            </div>
            
            <div className="bg-[#1A3A2C] p-8 rounded-2xl border border-[#2C5440]">
              <h3 className="text-2xl font-bold text-white mb-4">🌐 Multi-Chain Investor</h3>
              <p className="text-white font-semibold mb-4">
                "Managing investments across Ethereum, BSC, and Polygon was a nightmare. 
                OmniVest unified everything into one dashboard. Now I can rebalance my entire portfolio in minutes."
              </p>
              <div className="text-[#2FB574] font-bold">— Alex, DeFi Trader</div>
            </div>
            
            <div className="bg-[#1A3A2C] p-8 rounded-2xl border border-[#2C5440]">
              <h3 className="text-2xl font-bold text-white mb-4">🏦 Institutional Fund</h3>
              <p className="text-white font-semibold mb-4">
                "Our fund needed exposure to multiple chains but bridge risks were unacceptable. 
                OmniVest's native cross-chain capabilities eliminated counterparty risk entirely."
              </p>
              <div className="text-[#2FB574] font-bold">— Michael, Fund Manager</div>
            </div>
            
            <div className="bg-[#1A3A2C] p-8 rounded-2xl border border-[#2C5440]">
              <h3 className="text-2xl font-bold text-white mb-4">🚀 DeFi Newcomer</h3>
              <p className="text-white font-semibold mb-4">
                "DeFi seemed too complicated with all the different chains and bridges. 
                OmniVest made it simple — one platform, one wallet, access to everything."
              </p>
              <div className="text-[#2FB574] font-bold">— Emma, New Investor</div>
            </div>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            Why Choose OmniVest?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1A3A2C] p-6 rounded-2xl border border-[#2C5440] text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-3">Zero Bridge Risk</h3>
              <p className="text-white font-semibold">No bridge hacks, no wrapped token depegs. Pure omnichain security.</p>
            </div>
            
            <div className="bg-[#1A3A2C] p-6 rounded-2xl border border-[#2C5440] text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Execution</h3>
              <p className="text-white font-semibold">Cross-chain transactions execute instantly. No waiting periods.</p>
            </div>
            
            <div className="bg-[#1A3A2C] p-6 rounded-2xl border border-[#2C5440] text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-white mb-3">Native Assets</h3>
              <p className="text-white font-semibold">Use real Bitcoin, ETH, BNB. No wrapped or synthetic tokens.</p>
            </div>
            
            <div className="bg-[#1A3A2C] p-6 rounded-2xl border border-[#2C5440] text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-white mb-3">Universal Access</h3>
              <p className="text-white font-semibold">One platform for all current and future blockchains.</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-[#1A3A2C] p-12 rounded-2xl border border-[#2C5440]"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Universal DeFi?
          </h2>
          <p className="text-xl font-bold text-white mb-8 max-w-3xl mx-auto">
            Join thousands of investors who have already discovered the power of omnichain investing. 
            No bridges, no wrapped tokens, no compromises.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/omnivest"
              className="bg-[#2FB574] text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              🚀 Launch OmniVest Now
            </Link>
            <a
              href="https://labs.zetachain.com/get-zeta"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all"
            >
              💧 Get Testnet ZETA
            </a>
          </div>
          
          <div className="mt-8 text-white font-semibold">
            <p>🌐 Powered by ZetaChain • 🔒 Audited Smart Contracts • ⚡ Instant Cross-Chain</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsOmniVest;