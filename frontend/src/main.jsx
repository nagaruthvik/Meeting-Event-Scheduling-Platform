import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import NavBarProvider from './Components/NavBarContext.jsx'; 

createRoot(document.getElementById('root')).render(

    <NavBarProvider> 
      <App />
    </NavBarProvider>
 
);
