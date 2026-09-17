import type { IRoom } from "@/schemas/room.schemas";
import { useUser } from "reactfire";
import { Button } from "../ui/button";
import { Suspense } from "react";
import FriendEmail from "./FriendEmail";

interface Props {
  room: IRoom;
  handleClickRoomId: (id: string) => void;
}

const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const { data: user } = useUser();

  const frindUid = room.participants.find((id) => id !== user?.uid) || "";

  return (
    <Button onClick={() => handleClickRoomId(room.id)}>
      <Suspense fallback="Cargando informacion...">
        <FriendEmail friendUid={frindUid} />
      </Suspense>
    </Button>
  );
};
export default RoomChat;
