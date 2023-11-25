import { useEffect, useState } from 'react';
import { fetchFeaturedPosts, fetchNonFeaturedPosts, } from '../../Utilities/firebaseApi';
// import { db } from '../../firebase.js'
// import { collection, getDocs, query, where } from "firebase/firestore";
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

    const [featuredPosts, setFeaturedPosts] = useState([])
    const [nonFeaturedPosts, setNonFeaturedPosts] = useState([]);



    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let _featuredPosts = await fetchFeaturedPosts();
        let _nonFeaturedPosts = await fetchNonFeaturedPosts();

        console.log("home featured posts ", _featuredPosts)
        console.log("home non-featured posts ", _nonFeaturedPosts);


        setFeaturedPosts(_featuredPosts)
        setNonFeaturedPosts(_nonFeaturedPosts);
    };

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

                {featuredPosts.slice().reverse().map((post, index) => (
                    <SwiperSlide key={index}>
                        <section className="featured-post">
                            <div className="feat-bg feat-bg-1"

                                style={{
                                    backgroundImage: `url(${post.imageUrls && post.imageUrls.length > 0 ? post.imageUrls[0] : ''})`,
                                }}
                            >
                                <div className="feat-text-parent">
                                    <div className="feat-text">
                                        <div className="feat-top">
                                            <div className="feat-cat">
                                                <a href="/" className="category">{post.categoryDetails.category}</a>
                                            </div>

                                            <div className="feat-heading">
                                                <Link className="feat-title" to='/post'>{post.title}</Link>
                                            </div>
                                        </div>

                                        <div className="author-info">

                                            <ul className="auth-list">
                                                <li className=' post-img-parent'>
                                                    <img className='auth-img' src={post.authorDetails.image} alt="" />
                                                </li>

                                                <li className='lists autor-name'>
                                                    <a className='auth-link' href="/">{post.authorDetails.name}</a>
                                                </li>

                                                <li className="lists post-date">
                                                    February 10, 2022
                                                </li>

                                                <li className="lists min-read">
                                                    15 Min Read
                                                </li>

                                                <li className='lists auth-comments'>
                                                    {post.comments?.length} Comments
                                                </li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </SwiperSlide>
                ))}


                {/* Second */}
                {/* < SwiperSlide > <section className="featured-post">
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
                </SwiperSlide> */}
            </Swiper >


            {/* First Post */}
            < section className="post-section" >
                {nonFeaturedPosts.map((post, index) => (
                    <div key={index} className="blog-post">
                        <div className="post-card-img">
                            <img src={post.imageUrls[0]} alt="post" className="post-img" />
                        </div>

                        <div className="blog-post-text-parent">
                            <div className="blog-post-text">
                                <div className="entry-cat">
                                    <a href="/" className="blog-category">Food</a>
                                </div>

                                <div className="entry-head">
                                    <Link to="/post" className='post-title'>{post.title}</Link>
                                </div>

                                <div className="entry-des">
                                    <p className="description">{post.shortDescription} </p>
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
                ))}

            </section >

            <Footer />
        </>
    )
}

export default Home
