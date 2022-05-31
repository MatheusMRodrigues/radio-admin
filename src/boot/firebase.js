// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useQuasar, uid } from "quasar";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo_EmCzK9KvJJx4eOiRstCERiR4f5_MAk",
  authDomain: "tvguanambi-3f874.firebaseapp.com",
  projectId: "tvguanambi-3f874",
  storageBucket: "tvguanambi-3f874.appspot.com",
  messagingSenderId: "1021080857224",
  appId: "1:1021080857224:web:0a3a2505f6a12270604d3d",
  measurementId: "G-48SR4BX7XK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const linksCollectionRef = collection(db, "links");
const linksDocRef = doc(db, "links", "applinks");
const authDocRef = doc(db, "auth", "password");
const storageRef = getStorage();

export {
  linksDocRef,
  authDocRef,
  linksCollectionRef,
  storageRef,
  uploadBytes,
  getDownloadURL,
  db,
};
