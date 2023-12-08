import React, { useState } from 'react'
import '../SignUp/SignUp.css'
import Footer from '../Footer/Footer'
import profile from '../../assets/images/profile.png'
import { Link } from 'react-router-dom'
import { signUp } from '../../Utilities/firebaseAuth'


function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [signupSuccess, setSignupSuccess] = useState(false);



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const user = await signUp(email, password, name, profileImage);
            console.log('User signed up successfully:', user);

            setSignupSuccess(true);

        } catch (error) {
            console.error('Error in SignUp component:', error);
            // Handle error
        }
    };


    return (
        <>
            <section className="signup-container">
                <div className="signup-box">
                    {signupSuccess ? (
                        <div>
                            <p>Signup successful! You can now login.</p>
                            <Link to="/login" className='login-create'>Login Now</Link>


                        </div>
                    ) : (
                        <>

                            <div className="profile-circle">
                                <div className="prof-pic-parent">
                                    <img className='profile-img' src={profileImage ? URL.createObjectURL(profileImage) : profile} alt="" />
                                    <input type="file" className='file-input' id="file-input" accept='image/*' onChange={handleFileChange} />
                                    <label className='label-file' htmlFor="file-input">Choose a Photo</label>
                                </div>
                            </div>

                            <div className="signup-title">
                                <h5 className="signup-heading">Sign Up</h5>
                            </div>

                            <form onSubmit={handleSignUp} action='/' className="signup-form">
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
                        </>

                    )}

                </div>
            </section>

            <Footer />
        </>
    )
}

export default SignUp
