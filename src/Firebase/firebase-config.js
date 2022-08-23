import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyASaI8iBEzZl7i1rxOn5OfbEnBZ7yyq3Z8",
    authDomain: "what-eat-76289.firebaseapp.com",
    projectId: "what-eat-76289",
    storageBucket: "what-eat-76289.appspot.com",
    messagingSenderId: "974022408009",
    appId: "1:974022408009:web:16eccabda35d6164b28c98"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
