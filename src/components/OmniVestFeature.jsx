import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OmniVestFeature = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Why Choose OmniVest?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A professional cross-chain investment platform that simplifies multi-blockchain investing through advanced omnichain technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-[#2FB574] p-3 rounded-full">
                <span className="text-2xl">🔗</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Multi-Chain Access</h3>
                <p className="text-gray-300">
                  Connect to multiple blockchains through a single interface, simplifying cross-chain investment management
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#1B7A57] p-3 rounded-full">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Portfolio Management</h3>
                <p className="text-gray-300">
                  Track and manage all your cross-chain investments from one unified dashboard with real-time analytics
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#95ffb9] text-black p-3 rounded-full">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Fast Execution</h3>
                <p className="text-gray-300">
                  Execute cross-chain transactions efficiently using ZetaChain's omnichain infrastructure
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#2FB574] p-3 rounded-full">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Secure Infrastructure</h3>
                <p className="text-gray-300">
                  Built on ZetaChain's proven omnichain architecture with enterprise-grade security standards
                </p>
              </div>
            </div>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-[#1A3A2C] rounded-xl p-6 border border-[#2C5440] neon-mist">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Omnichain Portfolio</h4>
                <span className="bg-[#2FB574] text-black px-2 py-1 rounded text-xs font-semibold">Live on ZetaChain</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Omnichain Value</span>
                  <span className="text-2xl font-bold text-[#2FB574]">$847,200</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0A1F12] p-3 rounded text-center border border-[#2C5440]">
                    <div className="text-[#2FB574] font-bold">₿ 12.4</div>
                    <div className="text-xs text-gray-400">Bitcoin DeFi</div>
                  </div>
                  <div className="bg-[#0A1F12] p-3 rounded text-center border border-[#2C5440]">
                    <div className="text-[#95ffb9] font-bold">Ξ 89.2</div>
                    <div className="text-xs text-gray-400">ETH Yield</div>
                  </div>
                  <div className="bg-[#0A1F12] p-3 rounded text-center border border-[#2C5440]">
                    <div className="text-[#2FB574] font-bold">🌐 6</div>
                    <div className="text-xs text-gray-400">Active Chains</div>
                  </div>
                  <div className="bg-[#0A1F12] p-3 rounded text-center border border-[#2C5440]">
                    <div className="text-[#95ffb9] font-bold">+18.7%</div>
                    <div className="text-xs text-gray-400">Cross-Chain APY</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#2FB574] to-[#1B7A57] p-3 rounded text-center text-black font-semibold">
                  🚀 Omnichain Investments Active
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              to="/omnivest"
              className="inline-block bg-[#2FB574] px-8 py-4 rounded-xl font-bold text-black text-lg hover:scale-105 transition-transform shadow-lg"
            >
              Launch Platform
            </Link>
            <a
              href="https://docs.zetachain.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-white px-8 py-4 rounded-xl font-bold text-white text-lg hover:bg-white hover:text-black transition-all shadow-lg"
            >
              Documentation
            </a>
          </div>
          <p className="text-gray-400 mt-4">
            Powered by ZetaChain Omnichain Technology
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OmniVestFeature;