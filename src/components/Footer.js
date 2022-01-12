import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
    return (
      <div className='footer-container'>
        <div className='footer-links'>
          <div className='footer-link-wrapper'>
            <div className='footer-link-items'>
                <Link to='/about-us'>
                    <h2>About Us</h2>
                </Link>
            </div>
            <div className='footer-link-items'>
                <Link to='/contact-us'>
                    <h2>Contact Us</h2>
                </Link>
            </div>
          </div>
        </div>
        <section className='social-media'>
          <div className='social-media-wrap'>
            <div className='footer-logo'>
              <Link to='/' className='social-logo'>
                A TwoLlama Company
                <i className='fab fa-typo3' />
              </Link>
            </div>
            <small className='website-rights'>TwoLlama Travels © 2021</small>
          </div>
        </section>
      </div>
    )
}

export default Footer;

