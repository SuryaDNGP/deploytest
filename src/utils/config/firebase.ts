// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC1DlEp-P7yj3td_fHfu5FXfD6SHlR9zto',
  authDomain: 'test-4b18a.firebaseapp.com',
  projectId: 'test-4b18a',
  storageBucket: 'test-4b18a.appspot.com',
  messagingSenderId: '434614514430',
  appId: '1:434614514430:web:dd68bd06aee9115d5d6baf',
  measurementId: 'G-XFQLGR9S6R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
