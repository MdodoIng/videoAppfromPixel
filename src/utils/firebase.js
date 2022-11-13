
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDqmMpDkCCUdpy8zK5YX5gfsv4BkCGrToA",
  authDomain: "videos-912a3.firebaseapp.com",
  databaseURL: "https://videos-912a3-default-rtdb.firebaseio.com",
  projectId: "videos-912a3",
  storageBucket: "videos-912a3.appspot.com",
  messagingSenderId: "46263358034",
  appId: "1:46263358034:web:5205098e153d7c5d9b058b",
  measurementId: "G-93HDXZJCN7"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
