import { db } from '../firebase.js';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

// For Home.jsx
const fetchFeaturedPosts = async () => {
    let featuredPosts = [];
    const q = query(collection(db, "Posts"), where('isFeatured', '==', true));

    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
        const postData = doc.data();

        // Fetch additional details for category and author
        const categoryDetails = await fetchCategoryDetails(postData.categoryId);
        const authorDetails = await fetchAuthorDetails(postData.authorId);

        // Combine the post data with additional category and author details
        const postWithDetails = {
            ...postData,
            categoryDetails,
            authorDetails,
        };

        featuredPosts.push(postWithDetails);
    }

    console.log('Featured Posts with Details:', featuredPosts);

    return featuredPosts;
};

const fetchCategoryDetails = async (categoryId) => {
    const categoryDocRef = doc(db, 'categories', categoryId);
    const categoryDoc = await getDoc(categoryDocRef);
    return categoryDoc.data();
};

const fetchAuthorDetails = async (authorId) => {
    const authorDocRef = doc(db, 'author', authorId);
    const authorDoc = await getDoc(authorDocRef);
    return authorDoc.data();
};

const fetchPostById = async (postId) => {
    try {
        const postDocRef = doc(db, 'Posts', postId);
        const postDoc = await getDoc(postDocRef);

        if (postDoc.exists()) {
            const postData = postDoc.data();
            const categoryDetails = await fetchCategoryDetails(postData.categoryId);
            const authorDetails = await fetchAuthorDetails(postData.authorId);
            const comments = await fetchCommentsForPost(postData);
           

            const postWithDetails = {
                ...postData,
                categoryDetails,
                authorDetails,
                comments,
            };

            console.log('Post with Details:', postWithDetails);

            return postWithDetails;
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
};


const fetchCommentsForPost = async (post) => {
    const comments = [];

    // Check if the post has comments
    if (post.comments && post.comments.length > 0) {
        // Loop through each comment ID in the post's comments array
        for (const commentId of post.comments) {
            // Fetch the comment document based on the comment ID
            const commentDocRef = doc(db, 'Comments', commentId);
            const commentDoc = await getDoc(commentDocRef);

            // If the comment document exists, add it to the comments array
            if (commentDoc.exists()) {
                const commentData = commentDoc.data();
                comments.push(commentData);
            } else {
                console.warn(`Comment document with ID ${commentId} not found.`);
            }
        }
    }

    return comments;
};


export { fetchFeaturedPosts, fetchPostById };