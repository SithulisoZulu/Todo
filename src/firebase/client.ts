import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAYAB6rSRrodPJhM5BukxcmD-Blmoxaouk",
    authDomain: "mytodo-d8f54.firebaseapp.com",
    projectId: "mytodo-d8f54",
    storageBucket: "mytodo-d8f54.appspot.com",
    messagingSenderId: "51553625945",
    appId: "1:51553625945:web:e56f75150fc1179599ce48",
  
};

export const app = initializeApp(firebaseConfig);