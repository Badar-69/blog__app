import React, { useState } from 'react'
import '../Navbar/Navbar.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'


function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className='navbar'>
        <div className="nav-child">
          <div className="nav-img">
            <Link to='/'>
              <img src={logo} alt="" className="nav-logo" />
            </Link>

          </div>

          <div className="nav-links">
            <div className="nav-links-child">
              <Link  className='links' exact = 'true' to="/">Home</Link>
              <Link  className='links' to="/post">Post Features</Link>
              <Link  className='links' to="/">Blogs</Link>

              <div className="dropdown">
                <Link className='links dropdown-header' to='/'>Pages

                  <svg className='arrow-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                </Link>

                <div className="dropdown-content">
                  <Link className='drop-link' to="/author">Author</Link>
                  <Link className='drop-link' to="/login">Login</Link>
                  <Link className='drop-link' to="/signup">Sign Up</Link>
                  <Link className='drop-link' to="/error">404 Page</Link>
                </div>
              </div>


              <Link className='links' to="/contactUs">Contact Us</Link>
            </div>
          </div>

          <div className="search">
            <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill='#fff' d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>

            <svg
              className={`mobile-menu-icon fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}
              onClick={handleMobileMenuToggle}
              xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
          </div>


        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <Link onClick={closeMobileMenu} className='mob-links' exact = 'true' to="/">Home</Link>
            <Link onClick={closeMobileMenu} className='mob-links' to="/post">Post Features</Link>
            {/* <Link onClick={closeMobileMenu} className='mob-links' to="/">Blogs</Link> */}
            <Link onClick={closeMobileMenu} className='mob-links' to="/author">Author</Link>
            <Link onClick={closeMobileMenu} className='mob-links' to="/login">Login</Link>
            <Link onClick={closeMobileMenu} className='mob-links' to="/signup">Sign Up</Link>
            <Link onClick={closeMobileMenu} className='mob-links' to="/contactUs">Contact Us</Link>
            <Link onClick={closeMobileMenu} className='mob-links' to="/error">404 Page</Link>
          </div>
        )}
      </nav >
    </>
  )
}

export default Navbar
