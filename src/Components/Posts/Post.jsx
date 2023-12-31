import React, { useEffect, useState } from 'react';
import { fetchPostById, fetchAllCategories, fetchLatestPosts, addCommentToPost } from '../../Utilities/firebaseApi';
import '../Posts/Post.css'
import prevPost from '../../assets/images/prev.jpg'
import forPost from '../../assets/images/forward.jpg'
import Footer from '../Footer/Footer'
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../../Utilities/firebaseAuth';

function Post() {
    const { postId } = useParams();
    const [postDetails, setPostDetails] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);
    const [comment, setComment] = useState('');


    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const post = await fetchPostById(postId);
                setPostDetails(post);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const categories = await fetchAllCategories();
                setAllCategories(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchLatest = async () => {
            try {
                const latestPosts = await fetchLatestPosts();
                setLatestPosts(latestPosts);
            } catch (error) {
                console.error('Error fetching latest posts:', error);
            }
        };

        fetchPostDetails();
        fetchCategories();
        fetchLatest();
    }, [postId]);

    const splitIntoParagraphs = (text) => {
        // Split the text based on the pattern 'number - '
        return text.split(/\d+ - /).map((paragraph, index) => (
            // Exclude empty paragraphs
            paragraph.trim() !== '' && (
                <p key={index} className="post-body-para">
                    {paragraph}
                </p>
            )
        ));
    };


    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const user = await getCurrentUser();

        if (!user) {
            console.log('Please sign up first.');
            return;
        }

        const commentData = {
            reply: comment,
            userId: user.uid,
            dateAdded: new Date(),
            dateUpdated: new Date(),
        };

        try {
            await addCommentToPost(postId, commentData);
            console.log('Comment added successfully!');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <>
            <section className="post-blog-section">
                <div className="main-container">
                    <div className="post-row">
                        <div className="post-single">
                            <div className="post-sing-img">
                                {postDetails?.imageUrls?.slice(0, 1).map((imageUrl, index) => (
                                    <img key={index} src={imageUrl} alt={`Post  ${index + 1}`} className="post-img-1" />
                                ))}
                            </div>

                            <div className="post-sing-content">
                                <a href="/blog_app" className="post-category">{postDetails?.categoryDetails?.category}</a>

                                <h3 className="post-con-title">{postDetails?.title}</h3>

                                <ul className="post-sing-list">
                                    <li className='post-info list-post-img'>
                                        <img className='sing-post-author' src={postDetails?.authorDetails?.image} alt="" />
                                    </li>

                                    <li className="post-info post-auth-name">
                                        {postDetails?.authorDetails?.name}
                                    </li>

                                    <li className='post-info'>
                                        {postDetails.dateAdded && postDetails.dateAdded.seconds
                                            ? new Date(postDetails.dateAdded.seconds * 1000).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })
                                            : 'Date Not Available'}
                                    </li>

                                    <li className="post-info">
                                        15 Min Read
                                    </li>

                                    <li className="post-info">
                                        {postDetails?.comments?.length} Comment
                                    </li>
                                </ul>
                            </div>

                            <div className="post-body">

                                {postDetails?.fullDescription &&
                                    splitIntoParagraphs(postDetails?.fullDescription)}

                            </div>

                            <div className="body-img">
                                {postDetails?.imageUrls?.slice(0, 3).map((imageUrl, index) => (
                                    <img key={index} src={imageUrl} alt={`Post  ${index + 1}`} className="post-bd-img" />
                                ))}
                            </div>

                            <div className="post-tags">
                                <ul className="tags-list">
                                    <li className='tag'>Travel</li>
                                    <li className='tag'>Nature</li>
                                    <li className='tag'>Tips</li>
                                    <li className='tag'>Forest</li>
                                    <li className='tag'>Beach</li>
                                </ul>
                            </div>
                        </div>

                        {/* About Author */}
                        <div className="author-widget">
                            <div className="author-wid-info">
                                <div className="auth-info-img">
                                    <img src={postDetails?.authorDetails?.image} alt="" className='author-side-img' />
                                </div>
                                <div className="auth-content-parent">
                                    <div className="auth-wid-content">
                                        <h4 className="name-auth">Hi, I'm {postDetails?.authorDetails?.name}</h4>
                                        <p className="para-wid">
                                            {postDetails?.authorDetails?.about}
                                        </p>

                                        <div className="wid-socials">
                                            <svg className='wid-socials wid-fb-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='#ffffff' d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" /></svg>


                                            {/* insta */}
                                            <svg className='wid-socials wid-insta-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill='#ffffff' d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>

                                            {/* X */}
                                            <svg className='wid-socials wid-x-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill='#ffffff' d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" /></svg>

                                            {/* youtube */}
                                            <svg className='wid-socials wid-you-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill='#ffffff' d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>


                                            {/* pin */}
                                            <svg className='wid-socials wid-pin-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512"><path fill='#ffffff' d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <section className="latest-section">
                                <div className="late-widget">
                                    <div className="section-title">
                                        <h4 className="late-heading">Latest Post</h4>
                                    </div>

                                    {latestPosts.map((post, index) => (
                                        <div key={index} className="late-posts">
                                            <div className="late-items">
                                                <div className="late-img-parent">
                                                    <img src={post.imageUrls[0]} alt="" className="late-img" />
                                                </div>

                                                <div className="late-content">
                                                    <p className="late-para">
                                                        {post.title.split(' ').length > 7
                                                            ? `${post.title.split(' ').slice(0, 7).join(' ')}...`
                                                            : post.title}
                                                    </p>

                                                    <small className="post-date">
                                                        {post.dateAdded && post.dateAdded.seconds
                                                            ? new Date(post.dateAdded.seconds * 1000).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            })
                                                            : 'Date Not Available'}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>


                            <section className="cate-section">
                                <div className="cate-widget">
                                    <div className="cate-title">
                                        <h4 className="cate-wid-heading">Catgories</h4>
                                    </div>

                                    {allCategories.map((category) => (
                                        <div className="categories-list">
                                            <div className="cate-wid-list">
                                                <a href="/" className='cate-name'>{category.category}</a>
                                                <span href="/" className='cate-number'>22 Posts</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </section>

                            <section className="tag-section">
                                <div className="tag-widget">
                                    <div className="tag-wid-title">
                                        <h4 className="tag-wid-heading">Tags</h4>
                                    </div>

                                    <ul className="tag-wid-list">
                                        {postDetails?.tags && postDetails?.tags.map((tag, index) => (
                                            <li key={index} className='lists-tags'>{tag}</li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        </div>


                    </div>


                    <div className="all-post-row">
                        <div className="forward-post">
                            <div className="post-items">
                                <img src={prevPost} className='all-post-img prev-post' alt="" />

                                <div className="all-post-content">
                                    <a href="/" className="btn-link">
                                        Previous Post
                                    </a>

                                    <p className="btn-para">
                                        5 Things I Wish I Knew Before Travelling to Malaysia
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="previous-post">
                            <div className="post-items">
                                <img src={forPost} className='all-post-img forward-post' alt="" />

                                <div className="all-post-content">
                                    <a href="/" className="btn-link">
                                        Next Post
                                    </a>

                                    <p className="btn-para">
                                        5 Things I Wish I Knew Before Travelling to Malaysia
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="comments-section">
                        <div className="widget-comment">
                            <div className="comm-head">
                                <h3 className="comment-title"> {postDetails?.comments?.length} Comment</h3>
                            </div>

                            <div className="comm-users">
                                {postDetails?.comments?.map((comment, index) => (
                                    <div key={index} className="comm-item">
                                        <div className="comm-img-parent">
                                            <img src={comment.userDetails?.userImg} alt="" className="comm-user-img" />
                                        </div>
                                        <div className="comm-content">
                                            <ul className="user-info">
                                                <li className='info-list'>{comment.userDetails?.userName}</li>
                                                <li className='info-list'>January 15, 2022</li>
                                            </ul>

                                            <p className="comm-para">{comment.reply}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className="widget-form">
                                <div className="comm-head">
                                    <h3 className="comment-title"> Leave a Reply</h3>
                                </div>

                                <form action='/' className="comment-form" onSubmit={handleCommentSubmit}>
                                    <p className="comm-form-para">
                                        Your email address will not be published, Required fields are marked*.
                                    </p>

                                    <div className="input-parent-row">
                                        <textarea
                                            name="textarea"
                                            className="comm-inputs comm-textarea"
                                            placeholder='Message*'
                                            value={comment}
                                            onChange={handleCommentChange}
                                        ></textarea>

                                        <input type="text" className='comm-inputs inputs-small comm-name' placeholder='Name*' />
                                        <input type="email" className='comm-inputs inputs-small comm-email' placeholder='Email*' />

                                        <input type="checkbox" name="" id="comm-check" />
                                        <label className='comm-label' htmlFor="comm-check">save my name, email in this browser for the next time I comment</label>

                                        <div className="comm-btn-parent">
                                            <button className="comm-btn">
                                                Send Comment
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Post
