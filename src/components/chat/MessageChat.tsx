import type { IMessage } from "@/schemas/room.schemas";
import { useUser } from "reactfire";
import FriendEmail from "./FriendEmail";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Props {
  message: IMessage;
}

const MessageChat = ({ message }: Props) => {
  const { data: user } = useUser();

  const isFriend = user?.uid !== message.senderId;

  return (
    <div
      className={cn(
        "max-w-37.5 p-2 rounded",
        isFriend ? "bg-pink-200" : "bg-green-200 ml-auto",
      )}
    >
      <p>{message.text}</p>
      <p className="truncate text-xs">
        {isFriend ? (
          <Suspense fallback="cargando user info..">
            <FriendEmail friendUid={message.senderId} />
          </Suspense>
        ) : (
          user.email
        )}
      </p>
    </div>
  );
};
export default MessageChat;
