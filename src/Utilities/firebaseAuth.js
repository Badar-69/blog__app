import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';


const signUp = async (email, password, username, profileImage) => {
    try {
        console.log('Before creating user:', email, password, username, profileImage);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('After creating user:', userCredential);

        if (profileImage) {
            const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);
            await uploadBytes(storageRef, profileImage);
        }

        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
            email,
            registrationDate: serverTimestamp(),
            userImg: profileImage ? `profileImages/${user.uid}.jpg` : null,
            username,
        });

        return user;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); 
        resolve(user);
      }, reject);
    });
  };

export { signUp, getCurrentUser };