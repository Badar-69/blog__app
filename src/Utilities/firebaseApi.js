import { db } from '../firebase.js';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

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



export { fetchFeaturedPosts };