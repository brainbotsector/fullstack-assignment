import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <a href='#'>Abstract</a>
          <p>Branches</p>
        </div>

        <div className='footer-section'>
          <a href='#'>Resources</a>
          <p>Blog</p>
          <p>Help Center</p>
          <p>Release Notes</p>
          <p>Status</p>
        </div>

        <div className='footer-section'>
          <a href='#'>Community</a>
          <p>Twitter</p>
          <p>Linkedin</p>
          <p>Facebook</p>
          <p>Dribbble</p>
          <p>Podcast</p>
        </div>

        <div className='footer-section'>
          <a href='#'>Company</a>
          <p>About Us</p>
          <p>Careers</p>
          <p>Legal</p>
        </div>

        <div className='footer-section'>
          <a href='#'>Contact Us</a>
          <p>Email</p>
        </div>
      </div>
      <p className='footer-copyright'>© Copyright 2022 Abstract Studio Design, Inc. All rights reserved</p>
    </footer>
  );
};

export default Footer;
