import type { UserFirestore } from "@/schemas/user.schemas";
import type { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

export const useUserActions = () => {
  const db = useFirestore();

  const createOrUpdateUser = async (user: User) => {
    if (!user) throw new Error("Usuario no disponible");

    // Referenciar la collection en firestore

    const userDocRef = doc(db, "users", user.uid);

    const userData: UserFirestore = {
        email: user.email || "",
        uid: user.uid,
        displayname: user.displayName || "",
        photoUrl: user.photoURL || ""
    }

    return await setDoc(userDocRef, userData, {
        merge: true
    })
  };

  return {
    createOrUpdateUser,
  };
};
