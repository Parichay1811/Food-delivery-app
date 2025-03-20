// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBvyUPzISqe2NTZ_0LgJ1WKC7L-oq76i8",
  authDomain: "foodapp-4d31f.firebaseapp.com",
  projectId: "foodapp-4d31f",
  storageBucket: "foodapp-4d31f.firebasestorage.app",
  messagingSenderId: "10838558793",
  appId: "1:10838558793:web:0077aa0f65360aa2cb9798"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

export { auth, db, googleProvider }