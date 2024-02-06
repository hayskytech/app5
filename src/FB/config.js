import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD5fdKt-aeJGVxa5lEZxuye4tSIZKkfy-0",
  authDomain: "newone-55b3f.firebaseapp.com",
  databaseURL: "https://newone-55b3f-default-rtdb.firebaseio.com",
  projectId: "newone-55b3f",
  storageBucket: "newone-55b3f.appspot.com",
  messagingSenderId: "269884942787",
  appId: "1:269884942787:web:32fcb04cbcd5e4e767b576"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { db, app }