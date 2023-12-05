import React, { useState } from 'react'
import '../Login/Login.css'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      }).catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <section className="login-container">
        <div className="login-box">
          <div className="login-title">
            <h5 className="login-heading">Login</h5>
          </div>

          <form onSubmit={signIn} action='/' className="login-form">
            <input type="email" name="userName" className='form-one-input input-name' placeholder='Email' value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <input type="password" className='form-one-input input-pass' placeholder='Password' value={password}
              onChange={(e) => setPassword(e.target.value)} />

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

            <Link to="/signup" className='form-create'>Create One</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Login
