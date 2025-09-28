# OmniVest

OmniVest is a cross-chain investment platform built on ZetaChain's omnichain architecture. It empowers users to invest, track, and manage assets across multiple blockchains with full transparency and control.

## Features
- **Omnichain Dashboard:** Unified view of all your investments across supported chains.
- **WalletConnect v2 Integration:** Secure wallet connection with support for multiple wallets.
- **AI Auto-Fill:** AI-powered project and post submission to minimize manual effort.
- **Full Control & Minimal Risk:** Dissolve contracts and reclaim funds if needed.
- **Transparency:** All transactions are recorded on-chain and viewable at any time.

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express, Hardhat (for smart contracts)
- **Blockchain:** ZetaChain, Ethereum, BSC, Polygon
- **Wallets:** WalletConnect v2, MetaMask

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/hermit210/omnivest.git
   cd omnivest
   ```
2. Install dependencies for frontend and backend:
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

### Running Locally
- **Frontend:**
  ```sh
  cd frontend
  npm run dev
  ```
- **Backend:**
  ```sh
  cd backend
  npm start
  ```

### Environment Variables
- Set your WalletConnect project ID in Vercel or `.env` as `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`.
- Backend API keys and secrets should be set in `backend/.env`.

### Deployment
- Deploy the frontend to Vercel for best compatibility with WalletConnect v2.
- Ensure your `vercel.json` includes the correct Content-Security-Policy header for WalletConnect relay.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT

## Contact
For questions or support, open an issue or contact the maintainer via GitHub.
