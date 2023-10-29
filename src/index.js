import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CreditsContextProvider } from './context/CreditContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CreditsContextProvider>
        <App />
      </CreditsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

