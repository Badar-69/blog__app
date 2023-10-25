import React from 'react'
import '../SignUp/SignUp.css'
import Footer from '../Footer/Footer'
import profile from '../../assets/images/profile.png'

function SignUp() {
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

                    <form action='/' className="signup-form">
                        <input type="text" name="userName" className='form-two-input input-user' placeholder='Username' />
                        <input type="email" name="email" className="form-two-input input-email" placeholder='Email Address'/>
                        <input type="password" className='form-two-input input-pass2' placeholder='Password' />

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

                        <a href="/" className='login-create'>Login</a>
                    </p>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default SignUp
