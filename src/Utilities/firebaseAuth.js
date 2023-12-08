import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase'; // Import your Firestore and Storage instances

const signUp = async (email, password, username, profileImage) => {
    try {
        // Step 1: Create user with email and password
        console.log('Before creating user:', email, password, username, profileImage);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('After creating user:', userCredential);

        // Step 2: Upload profile picture to Firebase Storage
        if (profileImage) {
            const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);
            await uploadBytes(storageRef, profileImage);
        }

        // Step 3: Save additional user information to Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
            email,
            registrationDate: serverTimestamp(),
            userImg: profileImage ? `profileImages/${user.uid}.jpg` : null,
            username,
            // Add more user information if needed
        });

        return user;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

export { signUp };