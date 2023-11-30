import { useEffect, useState } from 'react';
import { fetchFeaturedPosts, fetchNonFeaturedPosts, } from '../../Utilities/firebaseApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../Home/Home.css'
import authorImg from '../../assets/images/author.jpg'

function Home() {
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [nonFeaturedPosts, setNonFeaturedPosts] = useState([]);



    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let _featuredPosts = await fetchFeaturedPosts();
        let _nonFeaturedPosts = await fetchNonFeaturedPosts();

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
                                                <Link className="feat-title" to={`/post/${post.id}`}>{post.title}</Link>
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
                                                    {new Date(post.dateAdded.seconds * 1000).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
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
                                    <a href="/" className="blog-category">{post.categoryDetails.category}</a>
                                </div>

                                <div className="entry-head">
                                    <Link to={`/post/${post.id}`} className='post-title'>{post.title}</Link>
                                </div>

                                <div className="entry-des">
                                    <p className="description">{post.shortDescription} </p>
                                </div>

                                <ul className="author-credit">
                                    <li className='post-card-author'>
                                        <img src={authorImg} alt="" className="post-auth-img" />
                                    </li>

                                    <p className="card-auth-name">{post.authorDetails.name}</p>

                                    <li className="entry-date">
                                        <p className="post-card-date">
                                            {new Date(post.dateAdded.seconds * 1000).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
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
