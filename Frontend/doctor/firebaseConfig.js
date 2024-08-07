import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBdzRfDZx483qUDRbXDxoCFq3ux7XBIO7c",
  authDomain: "medical-chatbot-2c5e1.firebaseapp.com",
  projectId: "medical-chatbot-2c5e1",
  storageBucket: "medical-chatbot-2c5e1.appspot.com",
  messagingSenderId: "637489809652",
  appId: "1:637489809652:web:23d9a4d22c26346b36f6a1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
