// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5a7o3Y7DSsgESzuXLtPoSuIBDrVNHgtg",
  authDomain: "blood-donor-application-66ea9.firebaseapp.com",
  databaseURL: "https://blood-donor-application-66ea9-default-rtdb.firebaseio.com",
  projectId: "blood-donor-application-66ea9",
  storageBucket: "blood-donor-application-66ea9.appspot.com",
  messagingSenderId: "222826379525",
  appId: "1:222826379525:web:287a36c4610bf0c4491f6c",
  measurementId: "G-PD17L7ERRK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


