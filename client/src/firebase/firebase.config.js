// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0QplptvnxYtMpaaebDyC5n5j5tanihBE",
  authDomain: "job-listing-project-e1623.firebaseapp.com",
  projectId: "job-listing-project-e1623",
  storageBucket: "job-listing-project-e1623.firebasestorage.app",
  messagingSenderId: "194345281263",
  appId: "1:194345281263:web:196ace042511df78b9dd1a",
  measurementId: "G-K7ZBB0ECW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;