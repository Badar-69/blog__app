import React from 'react'
import '../Error/Error.css'
import errorImg from '../../assets/images/error.png'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer'

function Error() {
    return (
        <>
            <section className="error-section">
                <div className="error-main-parent">
                    <div className="error-main">
                        <div className="error-img-parent">
                            <img src={errorImg} alt="" className="error-img" />
                        </div>

                        <div className="error-content">
                            <h3 className="error-title">Oops! This Page can't be found </h3>
                            <p className="error-para">
                                The page which you are looking for does not exist galley of type and scrambled it to make a type specimen book.
                            </p>

                            <Link to="/" className="error-btn">Go Back To Home</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Error
