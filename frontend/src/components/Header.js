import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
        <div className='header-left'>Abstract | Help Center</div>
        <button className='submit-button'>Submit a request</button>
    </header>
  )
}

export default Header;