import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { WalletProvider } from './context/WalletContext';
import { ZetaChainProvider } from './context/ZetaChainContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletProvider>
      <ZetaChainProvider>
        <App />
      </ZetaChainProvider>
    </WalletProvider>
  </React.StrictMode>,
);
