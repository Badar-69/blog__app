import React, { useState } from 'react'
import '../Login/Login.css'
import Footer from '../Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    // You can customize the email validation logic
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setIsValidEmail(isValid);
    return isValid;
  };

  const validatePassword = (value) => {
    // You can customize the password validation logic
    const isValid = value.length >= 8;
    setIsValidPassword(isValid);
    return isValid;
  };

  const signIn = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      alert('Login failed. Please check your inputs.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        navigate('/'); // Redirect to the home page
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
            <input type="email"
              name="userName"
              className='form-one-input input-name'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }} />
            {!isValidEmail && (
              <p style={{ color: 'red' }} className="error-message">
                Please enter a valid email!
              </p>
            )}

            <input type="password"
              className='form-one-input input-pass'
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }} />
            {!isValidPassword && (
              <p style={{ color: 'red' }} className="error-message">
                Password must be at least 8 characters long!
              </p>
            )}

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
