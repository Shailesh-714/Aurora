import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQvS0kOvPxP50bP2_7t-VwlQELxoCD8Uo",
  authDomain: "healthapp-aura.firebaseapp.com",
  projectId: "healthapp-aura",
  storageBucket: "healthapp-aura.appspot.com",
  messagingSenderId: "166575516121",
  appId: "1:166575516121:web:7a39a3c22a02626221d1c8",
  measurementId: "G-V75PLDQB2V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app,auth};
