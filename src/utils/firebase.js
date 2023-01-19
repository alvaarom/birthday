// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAKdWvbeILpvUVVar_6C0Dve4r-XFrBwjA',
  authDomain: 'birthday-a6c22.firebaseapp.com',
  projectId: 'birthday-a6c22',
  storageBucket: 'birthday-a6c22.appspot.com',
  messagingSenderId: '1012472559504',
  appId: '1:1012472559504:web:388f263e6a9b8511732515',
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
