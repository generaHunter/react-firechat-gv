import { useRoomActions } from "@/hooks/use-room-actions";
import RoomChat from "./RoomChat";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomChat = ({ handleClickRoomId }: Props) => {
  const { rooms } = useRoomActions();

  if (!rooms?.length) {
    return (
      <p className="p-4 text-center text-sm text-muted-foreground">
        No tienes conversaciones todavía
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {rooms.map((room) => (
        <RoomChat
          key={room.id}
          room={room}
          handleClickRoomId={handleClickRoomId}
        />
      ))}
    </div>
  );
};

export default ListRoomChat;