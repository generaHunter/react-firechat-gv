import type { UserFirestore } from "@/schemas/user.schemas";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

export const useFriendInfo = (friendUid: string) => {
  const db = useFirestore();
  const friendRef = doc(db, "users", friendUid);

  const { data: friend } = useFirestoreDocData(friendRef, {
    suspense: true,
  });

  return {
    friend: friend as UserFirestore
  }
};
