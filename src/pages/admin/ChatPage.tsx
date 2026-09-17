import FormMessageChat from "@/components/chat/FormMessageChat";
import FormSearchFriend from "@/components/chat/FormSearchFriend";
import ListRoomChat from "@/components/chat/ListRoomChat";
import MessagesChat from "@/components/chat/MessagesChat";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section className="space-y-4">
        <Suspense fallback={<div>Loading rooms...</div>}>
          <FormSearchFriend handleClickRoomId={handleClickRoomId} />
          <ListRoomChat handleClickRoomId={handleClickRoomId} />
        </Suspense>
      </section>
      <section className="space-y-4">
        {roomId ? (
          <Suspense fallback={<div>Loading messages...</div>}>
            <FormMessageChat roomId={roomId} />
            <MessagesChat roomId={roomId} />
          </Suspense>
        ) : (
          <div>Selecciona una sala para chatear</div>
        )}
      </section>
    </div>
  );
};
export default ChatPage;
