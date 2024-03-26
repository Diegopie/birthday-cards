// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQg50Z47CIW2Dfej8IzzTfax7skJGuU8A",
  authDomain: "sites-storage-5bf2f.firebaseapp.com",
  projectId: "sites-storage-5bf2f",
  storageBucket: "sites-storage-5bf2f.appspot.com",
  messagingSenderId: "363794540078",
  appId: "1:363794540078:web:e8027db61cfb1b825f61bf",
  measurementId: "G-LK91YHLQKR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

// const analytics = getAnalytics(app);