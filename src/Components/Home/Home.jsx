import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../Home/Home.css'
import authorImg from '../../assets/images/author.jpg'
import postImg from '../../assets/images/post-img-5.jpg'

function Home() {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>

                    <section className="featured-post">
                        <div className="feat-bg feat-bg-1">
                            <div className="feat-text-parent">
                                <div className="feat-text">
                                    <div className="feat-top">
                                        <div className="feat-cat">
                                            <a href="/" className="category">Lifestyle</a>
                                        </div>

                                        <div className="feat-heading">
                                            <Link className="feat-title" to='/post'>5 Effective Ways I’m Finding Focus in a Busy Season of Life</Link>

                                        </div>
                                    </div>

                                    <div className="author-info">

                                        <ul className="auth-list">
                                            <li className=' post-img-parent'>
                                                <img className='auth-img' src={authorImg} alt="" />
                                            </li>

                                            <li className='lists autor-name'>
                                                <a className='auth-link' href="/">David Smith</a>
                                            </li>

                                            <li className="lists post-date">
                                                February 10, 2022
                                            </li>

                                            <li className="lists min-read">
                                                15 Min Read
                                            </li>

                                            <li className='lists auth-comments'>
                                                2 Comments
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </SwiperSlide>

                {/* Second */}
                <SwiperSlide><section className="featured-post">
                    <div className="feat-bg feat-bg-2">
                        <div className="feat-text-parent">
                            <div className="feat-text">
                                <div className="feat-top">
                                    <div className="feat-cat">
                                        <a href="/" className="category">Interior</a>
                                    </div>

                                    <div className="feat-heading">
                                        <Link className="feat-title" to='/post'>7 Holiday Decor Ideas and Exactly What I Love About Each One</Link>
                                    </div>
                                </div>

                                <div className="author-info">

                                    <ul className="auth-list">
                                        <li className=' post-img-parent'>
                                            <img className='auth-img' src={authorImg} alt="" />
                                        </li>

                                        <li className='lists autor-name'>
                                            <a className='auth-link' href="/">David Smith</a>
                                        </li>

                                        <li className="lists post-date">
                                            February 10, 2022
                                        </li>

                                        <li className="lists min-read">
                                            15 Min Read
                                        </li>

                                        <li className='lists auth-comments'>
                                            2 Comments
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                </SwiperSlide>

                <SwiperSlide>
                    <section className="featured-post">
                        <div className="feat-bg feat-bg-3">
                            <div className="feat-text-parent">
                                <div className="feat-text">
                                    <div className="feat-top">
                                        <div className="feat-cat">
                                            <a href="/" className="category">Food</a>
                                        </div>

                                        <div className="feat-heading">
                                            <Link className="feat-title" to='/post'>What Are Your Tips for Hosting an Easy Birthday Party?
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="author-info">

                                        <ul className="auth-list">
                                            <li className=' post-img-parent'>
                                                <img className='auth-img' src={authorImg} alt="" />
                                            </li>

                                            <li className='lists autor-name'>
                                                <a className='auth-link' href="/">David Smith</a>
                                            </li>

                                            <li className="lists post-date">
                                                February 10, 2022
                                            </li>

                                            <li className="lists min-read">
                                                15 Min Read
                                            </li>

                                            <li className='lists auth-comments'>
                                                2 Comments
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </SwiperSlide>

                <SwiperSlide>
                    <section className="featured-post">
                        <div className="feat-bg feat-bg-4">
                            <div className="feat-text-parent">
                                <div className="feat-text">
                                    <div className="feat-top">
                                        <div className="feat-cat">
                                            <a href="/" className="category">Travel</a>
                                        </div>

                                        <div className="feat-heading">
                                            <Link className="feat-title" to='/post'>Get The Most Out of Iceland Mith our 10 Travel Mips
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="author-info">

                                        <ul className="auth-list">
                                            <li className=' post-img-parent'>
                                                <img className='auth-img' src={authorImg} alt="" />
                                            </li>

                                            <li className='lists autor-name'>
                                                <a className='auth-link' href="/">David Smith</a>
                                            </li>

                                            <li className="lists post-date">
                                                February 10, 2022
                                            </li>

                                            <li className="lists min-read">
                                                15 Min Read
                                            </li>

                                            <li className='lists auth-comments'>
                                                2 Comments
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </SwiperSlide>
            </Swiper>


            {/* First Post */}
            <section className="post-section">
                <div className="blog-post">
                    <div className="post-card-img">
                        <img src={postImg} alt="post" className="post-img" />
                    </div>

                    <div className="blog-post-text-parent">
                        <div className="blog-post-text">
                            <div className="entry-cat">
                                <a href="/" className="blog-category">Food</a>
                            </div>

                            <div className="entry-head">
                                <Link to="/post" className='post-title'>What Are Your Tips for Hosting an Easy Birthday Party?</Link>
                            </div>

                            <div className="entry-des">
                                <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quam atque ipsa laborum sunt distinctio... </p>
                            </div>

                            <ul className="author-credit">
                                <li className='post-card-author'>
                                    <img src={authorImg} alt="" className="post-auth-img" />
                                </li>

                                <p className="card-auth-name">David Smith</p>

                                <li className="entry-date">
                                    <p className="post-card-date">February 10, 2022</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Home
