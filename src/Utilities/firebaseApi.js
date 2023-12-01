import { db } from '../firebase.js';
import { collection, getDocs, query, where, doc, getDoc, limit, orderBy } from 'firebase/firestore';

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
            id: doc.id,
        };

        featuredPosts.push(postWithDetails);
    }
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

                // Fetch user details based on the userId in the comment
                const user = await fetchUserDetails(commentData.userId);

                // Add user details to the comment data
                const commentWithUserDetails = {
                    ...commentData,
                    userDetails: user,
                };

                comments.push(commentWithUserDetails);
            } else {
                console.warn(`Comment document with ID ${commentId} not found.`);
            }
        }
    }

    return comments;
}

const fetchUserDetails = async (userId) => {
    // Fetch user document based on userId
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    // If the user document exists, return user details
    if (userDoc.exists()) {
        return userDoc.data();
    } else {
        console.warn(`User document with ID ${userId} not found.`);
        return null;
    }
}

const fetchAllCategories = async () => {
    const categories = [];
    const q = collection(db, 'categories');
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const categoryData = doc.data();
        categories.push(categoryData);
    });

    console.log('All Categories:', categories);
    return categories;
};

// for author.jsx
const fetchAuthorCollection = async () => {
    const author = [];
    const a = collection(db, 'author')
    const querySnapshot = await getDocs(a)

    querySnapshot.forEach((doc) => {
        const authorData = doc.data();
        author.push(authorData)
    })

    console.log('Author Data:', author)
    return author
}

const fetchNonFeaturedPosts = async () => {
    const postsRef = collection(db, 'Posts');
    const q = query(postsRef, where('shortDescription', '!=', null));
    const querySnapshot = await getDocs(q);

    const nonFeaturedPosts = [];

    for (const doc of querySnapshot.docs) {
        const postData = doc.data();

        // Fetch additional details for category, author, and comments
        const categoryDetails = await fetchCategoryDetails(postData.categoryId);
        const authorDetails = await fetchAuthorDetails(postData.authorId);
        const comments = await fetchCommentsForPost(postData);

        // Combine the post data with additional details
        const postWithDetails = {
            ...postData,
            categoryDetails,
            authorDetails,
            comments,
            id: doc.id,
        };

        nonFeaturedPosts.push(postWithDetails);
    }

    return nonFeaturedPosts;
};

const fetchLatestPosts = async () => {
    try {
      const postsRef = collection(db, 'Posts');
      const q = query(postsRef, orderBy('dateAdded', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);
  
      const latestPostsData = [];
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        latestPostsData.push({ ...postData, id: doc.id });
      });
  
      return latestPostsData;
    } catch (error) {
      console.error('Error fetching latest posts:', error);
      throw error;
    }
  };

export { fetchFeaturedPosts, fetchPostById, fetchAllCategories, fetchAuthorCollection, fetchNonFeaturedPosts, fetchLatestPosts };