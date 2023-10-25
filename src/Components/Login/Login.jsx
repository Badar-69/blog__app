import React from 'react'
import '../Login/Login.css'
import Footer from '../Footer/Footer'


function Login() {
  return (
    <>
      <section className="login-container">
        <div className="login-box">
          <div className="login-title">
            <h5 className="login-heading">Login</h5>
          </div>

          <form action='/' className="login-form">
            <input type="text" name="userName" className='form-one-input input-name' placeholder='Username' />
            <input type="password" className='form-one-input input-pass' placeholder='Password' />

            <div className="custom-check">
              <div className="sign-control">
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label htmlFor="rememberMe" className="label">Remember Me </label>
              </div>

              <a href="/" className='forgot'>Forgot Password?</a>
            </div>

            <div className="form-submit">
              <button type='submit' className='custom-btn'>Login Now</button>
            </div>
          </form>

          <p className="form-para">
            Don't have an account?

            <a href="/" className='form-create'>Create One</a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Login
