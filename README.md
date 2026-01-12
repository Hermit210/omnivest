# OmniVest

OmniVest is a cross-chain investment platform built on ZetaChain's omnichain architecture. It empowers users to invest, track, and manage assets across multiple blockchains with full transparency and control.

## Features
- **Omnichain Dashboard:** Unified view of all your investments across supported chains.
- **WalletConnect v2 Integration:** Secure wallet connection with support for multiple wallets.
- **AI Auto-Fill:** AI-powered project and post submission to minimize manual effort.
- **Full Control & Minimal Risk:** Dissolve contracts and reclaim funds if needed.
- **Transparency:** All transactions are recorded on-chain and viewable at any time.
# OmniVest 

This repository contains the OmniVest web application: a cross-chain investment platform built on ZetaChain's omnichain architecture.

This README was updated to explain recent changes performed during a rebranding and deployment fix cycle.

## Recent changes (what I did)
- Renamed frontend-visible branding from "Finvest" to "OmniVest" across the site UI and pages.
- Restored logo and image usage in the frontend (logo in Navbar, favicon, and other UI assets).
- Fixed Vercel deployment issues by repairing malformed `vercel.json` files and relaxing the Content-Security-Policy (CSP) to allow external images (Cloudinary) and WalletConnect relay connections.
- Resolved merge conflicts and synchronized a nested `frontend` Git repository (the `frontend` directory is itself a Git repository). The `frontend` repo and the root repo were both updated and pushed.

## Important repository layout note
- The repository currently contains a nested Git repository at `frontend/`. That folder is an independent repo (a gitlink in the parent). This can be useful for separate CI or deploy flows, but it also complicates simple clones and pushes.
  - If you want a single-repo layout instead, remove the `frontend/.git` folder and commit the `frontend` contents into the root repository. (I can do this for you if you prefer.)
- Several Hardhat/build artifact files exist under `backend/artifacts` and may be present in the repo. It's recommended to add build artifacts and `node_modules` to `.gitignore` and remove them from history if needed.

## Why images were not visible after deployment
- Vercel enforces the Content-Security-Policy headers defined in `vercel.json`. The site originally had a CSP that limited sources to `'self'`, which blocked externally-hosted images (for example, the Cloudinary logo URLs used by the UI). I updated both `vercel.json` files (root and `frontend/vercel.json`) to include:
  - `img-src 'self' data: https:`
  - This permits images from HTTPS origins (Cloudinary) and inline data URIs so the logo and other images render when deployed.

## WalletConnect / Wallet connection fix
- The frontend uses WalletConnect v2. After deployment, wallets could fail to connect if the WalletConnect project id isn't available in the build environment or if CSP blocks relay connections.
- What you must set in Vercel (project/environment variables):
  - `VITE_WALLETCONNECT_PROJECT_ID` — preferred for Vite builds.
  - For backward compatibility the app also reads `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` and `process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` when available. On Vercel, set the environment variable in Project Settings → Environment Variables.
- Ensure Vercel's environment variables are available at build time (set them in the Vercel dashboard, not only in runtime). Also verify `vercel.json` contains the WalletConnect relay host in the `connect-src` CSP (it contains `wss://relay.walletconnect.com` and `https://*.walletconnect.com` in the current config).

## How to build and deploy (local + Vercel)
1. Frontend (development):
   ```powershell
   cd frontend
   npm install
   npm run dev
   # Open http://localhost:5173 or the port Vite prints (it may shift to 5174 if 5173 is in use)
   ```
2.  Frontend (production build):
   ```powershell
   cd frontend
   npm install
   npm run build
   # Dist will be created at frontend/dist
   ```
3. Backend (development):
   ```powershell
   cd backend
   npm install
   npm start
   ```
4. On Vercel:
   - Ensure `VITE_WALLETCONNECT_PROJECT_ID` (or `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`) is set in Project Settings → Environment Variables.
   - Trigger a redeploy after you set environment variables.
   - If images still don't appear, check the deployment's response headers (Vercel dashboard → deployment → preview) to confirm the CSP header is present and includes `img-src https:`.

## Recommended cleanup tasks (optional but recommended)
- Decide whether `frontend` should remain a nested repo or be absorbed into the root repo. If absorbed, remove `frontend/.git` and commit the folder into the parent repository.
- Add `backend/artifacts`, `frontend/dist`, and `node_modules` to `.gitignore` (if not already), and remove their contents from Git history if needed (use `git rm --cached` and rewrite history carefully).
- Consider moving the favicon and key static images into `frontend/public` so builds consistently reference local assets instead of external URLs.

## Troubleshooting
- If wallets don't connect after setting the WalletConnect project ID:
  1. Confirm `VITE_WALLETCONNECT_PROJECT_ID` is set in Vercel and that the deployment log shows the variable is present at build time.
  2. Open your browser console on the deployed site and look for WalletConnect or CSP errors.
  3. Check `vercel.json` headers in the Vercel deployment; ensure the `Content-Security-Policy` header includes `connect-src` entries for `wss://relay.walletconnect.com` and `https://*.walletconnect.com`.

## Contact / Support
If you want me to:
- Run a production build and commit `frontend/dist` to the repo,
- Convert `frontend` into a regular directory (remove nested git), or
- Add a small CI workflow to build and deploy automatically,
tell me which you'd like and I will proceed.

deployement open this https://omnivest-n6er.vercel.app/
