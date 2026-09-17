import type { IRoom } from "@/schemas/room.schemas";
import type { UserFirestore } from "@/schemas/user.schemas";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useRoomActions = () => {
  const db = useFirestore();
  const { data: user } = useUser();
  const roomCollectionRef = collection(db, "rooms");
  const roomQuery = query(
    roomCollectionRef,
    where("participants", "array-contains", user?.uid),
  );

  const { data: rooms } = useFirestoreCollectionData(roomQuery, {
    suspense: true,
    idField: "id",
  });

  //buscar un user con email

  const searchUserWithEmail = async (email: string) => {
    const userRef = collection(db, "users");

    const userQuery = query(userRef, where("email", "==", email));

    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];

    return doc.data() as UserFirestore;
  };

  const findOrCreateRoom = async (friendEmail: string) => {
    if (!user) {
      return {
        success: false,
        message: "401 Not Autorized",
        roomId: null,
      };
    }

    if (user.email === friendEmail)
      return {
        success: false,
        message: "404 No te puedes buscar a ti mismo",
        roomId: null,
      };

    const friend = await searchUserWithEmail(friendEmail);

    if (!friend)
      return {
        success: false,
        message: "404 Friend Not Found",
        roomId: null,
      };

      console.log("rooms: ", rooms);

      const roomsTyping = rooms as IRoom[];

    const existRoom = roomsTyping.find((room) =>
      room.participants.includes(friend.uid),
    );

    console.log("existRoom: ", existRoom);

    if (existRoom)
      return {
        success: true,
        message: "200 Room finding",
        roomId: existRoom.id,
      };

    const timestamp = serverTimestamp();

    const roomNew: Omit<IRoom, "id"> = {
      createdAt: timestamp,
      lastMessage: null,
      participants: [user.uid, friend.uid],
    };

    const document = await addDoc(roomCollectionRef, roomNew);

    return {
      success: true,
      message: "201 Room created",
      roomId: document.id,
    };
  };

  return {
    rooms: rooms as IRoom[],
    findOrCreateRoom,
  };
};
