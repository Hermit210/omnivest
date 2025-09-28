// next.config.js
// Fix for silent WalletConnect v2 connection failure on Vercel
// Adds Content-Security-Policy header to allow WalletConnect relay server

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; connect-src 'self' wss://relay.walletconnect.com https://*.walletconnect.com;`,
          },
        ],
      },
    ];
  },
};

// Reminder: Set your WalletConnect projectId as a Vercel environment variable
// Example: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
// Without this, WalletConnect will silently fail in production.
