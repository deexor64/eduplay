// TODO: move these to font end pages


import { clientAuth } from "./firebaseClient";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function signUp(email: string, password: string) {
  return await createUserWithEmailAndPassword(clientAuth, email, password);
}

export async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(clientAuth, email, password);
}

export async function logOut() {
  return await signOut(clientAuth);
}
