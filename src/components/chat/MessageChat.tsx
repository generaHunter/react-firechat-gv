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
        "flex flex-col gap-1",
        isFriend ? "items-start" : "items-end",
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-sm",
          isFriend
            ? "rounded-bl-sm bg-muted text-foreground"
            : "rounded-br-sm bg-primary text-primary-foreground",
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
      </div>
      <p className="px-1 text-[11px] text-muted-foreground">
        {isFriend ? (
          <Suspense fallback="cargando...">
            <FriendEmail friendUid={message.senderId} />
          </Suspense>
        ) : (
          user?.email
        )}
      </p>
    </div>
  );
};

export default MessageChat;