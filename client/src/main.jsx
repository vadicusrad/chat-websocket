import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProviderMode from './components/theme/ThemeProviderMode';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProviderMode>
      <Router>
        <App />
      </Router>
    </ThemeProviderMode>
  </React.StrictMode>
);
