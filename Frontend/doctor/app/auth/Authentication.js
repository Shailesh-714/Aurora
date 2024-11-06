// authFunctions.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { GoogleOneTapSignInSingleton } from "react-native-google-one-tap-signin/src/GoogleOneTapSignIn";

export const signUp = async (email, password) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    return { success: `Registered with: ${user.email}` };
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return { error: "This email address is already in use." };
    } else if (error.code === "auth/invalid-email") {
      return { error: "This email address is invalid." };
    } else if (error.code === "auth/weak-password") {
      return { error: "The password is too weak." };
    } else {
      return { error: error.message };
    }
  }
};

export const login = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    return { success: `Logged in with: ${user.email}` };
  } catch (error) {
    return { error: error.message };
  }
};

// export const google = async () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//     .then((result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       const user = result.user;
//       return { success: `Logged in with Google: ${user.email}` };
//     }).catch((error) => {
//       return { error: error.message };
//     });
// };

export const google = async () => {
  GoogleOneTapSignInSingleton.signIn();
};
