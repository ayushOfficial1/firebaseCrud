// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
require("dotenv").config();

import { GoogleAuthProvider, getAuth } from "firebase/auth";

// const firebaseConfig = {
// //   apiKey: "AIzaSyDY0yXXGsAteEiKYAK2LgwHffvNDRDV25M",
// //   authDomain: "todo-bce57.firebaseapp.com",
// //   projectId: "todo-bce57",
// //   storageBucket: "todo-bce57.appspot.com",
// //   messagingSenderId: "713928920854",
// //   appId: "1:713928920854:web:19433b710354be3e968a37",
//   process.env.API_KEY=AIzaSyDY0yXXGsAteEiKYAK2LgwHffvNDRDV25M
//   process.env.AUTH_DOMAIN=todo-bce57.firebaseapp.com
//   process.env.PROJECT_ID=todo-bce57
//   process.env.STORAGE_BUCKET=todo-bce57.appspot.com
//   process.env.MESSAGING_SENDER_ID=713928920854
//   process.env.APP_ID=1:713928920854:web:19433b710354be3e968a37

// };
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
