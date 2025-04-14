import { db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc }
from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import Cookies from "js-cookie";

/** Get user object from Firestore */
export const getUser = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
};

/** Check auth via cookie or Firebase auth state */
export const checkUserAuth = (): any => {
  const cookie = Cookies.get("User");
  return cookie ? JSON.parse(cookie) : null;
};

/** Login user and persist cookie */
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;
    const userData = await getUser(uid);

    if (userData) {
      Cookies.set("User", JSON.stringify({ uid, ...userData }), { expires: 7 });
    }

    return userData;
  } catch (error) {
    throw new Error("Invalid email or password");
  }
};

/** Sign up user and create Firestore entry */
export const registerUser = async (
  userData: Record<string, any>,
  preferences: Record<string, any>
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const { uid } = userCredential.user;

    const fullUser = {
      ...userData,
      uid,
      tier: "free",
      created_at: new Date().toISOString(),
    };

    console.log("User data:", fullUser);
    console.log("Preferences data:", preferences);

    await setDoc(doc(db, "users", uid), fullUser);
    await setDoc(doc(db, "user_preferences", uid), { user_id: uid, ...preferences });

    Cookies.set("User", JSON.stringify(fullUser), { expires: 7 });
    return fullUser;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message || "Failed to sign up user");
  }
};

/** Logout user and clear cookie */
export const logoutUser = async () => {
  await signOut(auth);
  Cookies.remove("User");
};

/** Change user's subscription tier */
export const changeTier = async (uid: string, newTier: string) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { tier: newTier });

  const updatedUser = await getUser(uid);
  Cookies.set("User", JSON.stringify({ uid, ...updatedUser }), { expires: 7 });

  return updatedUser;
};

/** Update user details in Firestore */
export const updateUser = async (uid: string, updatedData: Record<string, any>) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, updatedData);

    const updatedUser = await getUser(uid);
    Cookies.set("User", JSON.stringify({ uid, ...updatedUser }), { expires: 7 });

    return updatedUser;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message || "Failed to update user");
  }
};