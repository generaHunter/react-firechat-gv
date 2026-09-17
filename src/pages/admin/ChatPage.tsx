import FormMessageChat from "@/components/chat/FormMessageChat";
import FormSearchFriend from "@/components/chat/FormSearchFriend";
import ListRoomChat from "@/components/chat/ListRoomChat";
import MessagesChat from "@/components/chat/MessagesChat";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  };

  return (
    <div className="flex h-[calc(100dvh-4rem)] w-full overflow-hidden rounded-xl border bg-background shadow-sm">
      {/* Sidebar: búsqueda + lista de salas */}
      <aside
        className={cn(
          "flex w-full flex-col border-r bg-muted/20 md:w-80 lg:w-96",
          roomId && "hidden md:flex",
        )}
      >
        <div className="shrink-0 border-b bg-background p-3">
          <h2 className="mb-3 px-1 text-sm font-semibold tracking-tight">
            Mensajes
          </h2>
          <FormSearchFriend handleClickRoomId={handleClickRoomId} />
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <Suspense
            fallback={
              <p className="p-3 text-sm text-muted-foreground">
                Loading rooms...
              </p>
            }
          >
            <ListRoomChat handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </div>
      </aside>

      {/* Panel de chat */}
      <main
        className={cn(
          "flex flex-1 flex-col overflow-hidden",
          !roomId && "hidden md:flex",
        )}
      >
        {roomId ? (
          <>
            {/* Botón atrás solo en móvil */}
            <div className="flex shrink-0 items-center gap-2 border-b bg-background p-2 md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRoomId("")}
                className="gap-1"
              >
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
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Atrás
              </Button>
            </div>

            <Suspense
              fallback={
                <p className="p-3 text-sm text-muted-foreground">
                  Loading messages...
                </p>
              }
            >
              <MessagesChat roomId={roomId} />
              <FormMessageChat roomId={roomId} />
            </Suspense>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
            Selecciona una sala para chatear
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;