// authFunctions.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

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
//   try {
//     await GoogleSignin.hasPlayServices();
//     const googleUser = await GoogleSignin.signIn();

//     // Create a credential using the Google ID token
//     const credential = GoogleAuthProvider.credential(
//       googleUser.idToken,
//       googleUser.accessToken
//     );

//     // Sign in with Firebase using the Google credential
//     const userCredential = await auth.signInWithCredential(credential);
//     const user = userCredential.user;
//     return { success: `Logged in with Google: ${user.email}` };
//   } catch (error) {
//     if (error.code === "auth/account-exists-with-different-credential") {
//       return { error: "Account exists with different credential." };
//     } else if (error.code === "auth/cancelled-popup-request") {
//       return { error: "Sign-in process was cancelled." };
//     } else {
//       return { error: error.message };
//     }
//   }
// };
