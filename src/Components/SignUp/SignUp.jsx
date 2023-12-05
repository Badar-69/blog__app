import React, { useState } from 'react'
import '../SignUp/SignUp.css'
import Footer from '../Footer/Footer'
import profile from '../../assets/images/profile.png'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";


function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <section className="signup-container">
                <div className="signup-box">
                    <div className="profile-circle">
                        <div className="prof-pic-parent">
                            <img className='profile-img' src={profile} alt="" />
                            <input type="file" className='file-input' id="file-input" accept='image/*' />
                            <label className='label-file' htmlFor="file-input">Choose a Photo</label>
                        </div>
                    </div>

                    <div className="signup-title">
                        <h5 className="signup-heading">Sign Up</h5>
                    </div>

                    <form onSubmit={signUp} action='/' className="signup-form">
                        <input type="text" name="userName" className='form-two-input input-user' placeholder='Username'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                        <input type="email" name="email" className="form-two-input input-email" placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        <input type="password" className='form-two-input input-pass2' placeholder='Password' value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        <div className="custom-signup">
                            <div className="signup-control">
                                <input type="checkbox" name="checkbox" id="checkbox" />
                                <label htmlFor="rememberMe" className="label-agree">Agree to our </label>
                            </div>

                            <a href="/" className='terms'>Terms & Conditions</a>
                        </div>

                        <div className="form-submit-btn">
                            <button type='submit' className='custom-btn2'>Sign Up</button>
                        </div>
                    </form>

                    <p className="form-para2">
                        Already have an account?

                        <Link to="/login" className='login-create'>Login</Link>
                    </p>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default SignUp
