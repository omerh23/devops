// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCWB_8KWAx8Dr3aJ9aNKH3FpX8XZ2rNUuU',
  authDomain: 'devops-961cd.firebaseapp.com',
  projectId: 'devops-961cd',
  storageBucket: 'devops-961cd.appspot.com',
  messagingSenderId: '337996820598',
  appId: '1:337996820598:web:739bf3a3f4445cfb876f57',
  measurementId: 'G-FMPD8GFGQF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
