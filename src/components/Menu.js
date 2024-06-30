import React, { useState } from 'react';
import headerImage from '../assets/logoCertify.svg';
import menuIcon from '../assets/certButton.svg';
import '../styles/Menu.css';

const Menu = ({ startApp }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="menu">
      <img src={headerImage} alt="Header" className="header-image" />
        <button className="menu-icon" onClick={toggleMenu} >
        <img src={menuIcon} alt="Menu Icon" />
      </button>
      <nav className={isMenuOpen ? "menu-open" : ""}>
        <ul>
          <li>
            <a href="./LandingPage.js">Home</a>
          </li>
          <li>
            <button onClick={startApp} style={{maxHeight: 30}} >Gerar Certificado</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Menu;
