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




async function deleteAllUsers() {
  try {
    let nextPageToken: string | undefined = undefined;

    do {
      // List up to 1000 users at a time
      const listUsersResult = await adminAuth.listUsers(1000, nextPageToken);
      const uids = listUsersResult.users.map((user) => user.uid);

      if (uids.length > 0) {
        const deleteResult = await adminAuth.deleteUsers(uids);
        console.log(
          `Deleted ${deleteResult.successCount} users, ${deleteResult.failureCount} failures`
        );
        if (deleteResult.failureCount > 0) {
          console.error(deleteResult.errors);
        }
      }

      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    console.log("All Firebase Auth users deleted!");
  } catch (err) {
    console.error("Error deleting users:", err);
  }
}

deleteAllUsers();