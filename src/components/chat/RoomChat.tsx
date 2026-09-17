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
    <Button
      variant="ghost"
      onClick={() => handleClickRoomId(room.id)}
      className="h-auto w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-normal"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </span>
      <span className="truncate">
        <Suspense
          fallback={<span className="text-muted-foreground">Cargando...</span>}
        >
          <FriendEmail friendUid={frindUid} />
        </Suspense>
      </span>
    </Button>
  );
};

export default RoomChat;