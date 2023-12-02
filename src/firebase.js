// https://scrimba.com/learn/learnreact/firebase-code-setup-cod52467caf58a8193b5f6a49

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfV0R64er2l9nqWyjOGaNqVnF7Ye8XNXQ",
  authDomain: "react-notes-65581.firebaseapp.com",
  projectId: "react-notes-65581",
  storageBucket: "react-notes-65581.appspot.com",
  messagingSenderId: "312685029891",
  appId: "1:312685029891:web:6562eefde81fc7ae55fc36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes")


// If you try to set up locally, execute in Terminal the following command:
// npm install firebase
//  npm install firebase --legacy-peer-deps