import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyC2_XRBkkCtgiR4duyX9GOLY5NiZfdGMLM",
  authDomain: "react-course-33d06.firebaseapp.com",
  projectId: "react-course-33d06",
  storageBucket: "react-course-33d06.appspot.com",
  messagingSenderId: "797348382982",
  appId: "1:797348382982:web:b442532cb8ef8ffa717687"
};

export const FirebaseApp  = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );