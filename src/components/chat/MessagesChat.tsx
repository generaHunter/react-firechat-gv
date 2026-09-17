import { useMessagesActions } from "@/hooks/use-messages-actions";
import MessageChat from "./MessageChat";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  const { messages } = useMessagesActions(roomId);

  if (!messages?.length) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        No hay mensajes todavía. ¡Di hola!
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageChat key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessagesChat;