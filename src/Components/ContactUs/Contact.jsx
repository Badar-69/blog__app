import React from 'react'
import '../ContactUs/Contact.css'
import Footer from '../Footer/Footer'

function Contact() {
    return (
        <>
            <section className="contact-main">
                <div className="main-form">
                    <form method='Post' action="/" className="contact-form">
                        <div className="form-head">
                            <h5 className="form-title">Feel free to contact anytime</h5>
                            <p className="contact-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, repudiandae.</p>
                        </div>

                        <div className="form-inputs">
                            <input type="text" className='contact-inputs contact-name' placeholder='Your Name' />

                            <input type="email" className='contact-inputs contact-email' placeholder='Your Email' />

                            <input type="text" className='contact-inputs contact-subject' placeholder='Your Subject' />

                            {/* <input type="text" className='contact-inputs contact-msg' placeholder='Your Message' /> */}
                            <textarea name="" className="contact-inputs contact-msg" placeholder='Your Message'></textarea>
                        </div>

                        <button className="contact-btn">Send Message</button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Contact
