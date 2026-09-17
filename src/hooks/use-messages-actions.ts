import type { IMessage } from "@/schemas/room.schemas";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useMessagesActions = (roomId: string) => {
  const db = useFirestore();
  const { data: user } = useUser();

  const messageRef = collection(db, "rooms", roomId, "messages");

  const messagesQuery = query(messageRef, orderBy("timestamp", "asc"));

  const { data: messages } = useFirestoreCollectionData(messagesQuery, {
    suspense: true,
    idField: "id",
  });

  const sendMessage = async (text: string) => {
    if (!user) throw new Error("useMessagesActions: 401");

    const timestamp = serverTimestamp();

    //Crear un mensaje
    const messageData: Omit<IMessage, "id"> = {
      senderId: user.uid,
      text: text,
      timestamp,
    };

    //Actualizar last message
    const roomRef = doc(db, "rooms", roomId);

    await Promise.all([
      addDoc(messageRef, messageData),
      updateDoc(roomRef, {
        lastMessage: messageData,
      }),
    ]);
  };

  return {
    messages: messages as IMessage[],
    sendMessage,
  };
};
