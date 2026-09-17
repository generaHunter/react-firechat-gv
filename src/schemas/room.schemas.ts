import type { FieldValue, Timestamp } from "firebase/firestore";

export interface IRoom {
    id: string;
    participants: string[];
    createdAt: Timestamp | FieldValue;
    lastMessage: IMessage | null;
}

export interface IMessage {
    id?: string;
    text: string;
    senderId: string;
    timestamp: Timestamp | FieldValue;
}