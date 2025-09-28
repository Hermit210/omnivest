# 🚀 OmniVest Startup Guide

## Quick Start Instructions

### 1. Start Backend Server
```bash
cd backend
npm start
```
**Expected output:** `Server is running at PORT 8000`

### 2. Start Frontend Server  
```bash
cd frontend
npm run dev
```
**Expected output:** `Local: http://localhost:5173/`

### 3. Test the Setup

1. **Visit OmniVest**: Go to `http://localhost:5173/omnivest`
2. **Test Backend**: Click the "🔧 Test Backend" button
3. **Connect Wallet**: Click "Connect Omnichain Wallet"
4. **Test Investment**: Go to "Cross-Chain Investments" tab and click "Invest Cross-Chain"

## Troubleshooting

### Backend Issues
- **Port 8000 in use**: Change PORT in `backend/server.js`
- **Database connection**: Check `.env` file has DB credentials
- **CORS errors**: Backend has `app.use(cors())` enabled

### Frontend Issues  
- **Can't connect to backend**: Make sure backend is running on port 8000
- **Wallet connection fails**: Make sure MetaMask is installed
- **Investment fails**: Check browser console for detailed errors

### Common Fixes
1. **Clear browser cache** and reload
2. **Check both servers are running** in separate terminals
3. **Verify MongoDB connection** in backend logs
4. **Check browser console** for JavaScript errors

## Debug Steps

1. **Test Backend API**:
   ```bash
   curl http://localhost:8000/api/debug
   ```

2. **Test Investment API**:
   ```bash
   curl http://localhost:8000/api/investments/test
   ```

3. **Check Database Connection**: Look for "Database is successfully connected" in backend logs

4. **Browser Console**: Open DevTools → Console to see detailed error messages

## Expected Behavior

✅ **Working Investment Flow**:
1. Click "Invest Cross-Chain" button
2. See wallet address in console
3. See "Investment created" in console  
4. Get success alert with transaction hash
5. Portfolio refreshes with new investment

❌ **Common Error Messages**:
- "Please connect your wallet first" → Connect MetaMask
- "Backend connection failed" → Start backend server
- "Server error: 500" → Check database connection
- "CORS error" → Backend CORS issue

---

**Need Help?** Check the browser console for detailed error messages!