import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Navbar from './components/Navbar';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import styles from './style';
import './index.css'; // Import CSS file separately

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="bg-secondary min-h-screen min-w-screen">
      <div className="bg-primary text-white stickyOnMobile">
        <TopNav />
        <Navbar />
      </div>
      <App />
      <div className={`${styles.paddingX} ${styles.flexStart} bg-primary text-white`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  </BrowserRouter>
);

