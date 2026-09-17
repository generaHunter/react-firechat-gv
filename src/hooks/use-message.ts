import { toast } from "@/components/ui/toast";

export const useMessage = () => {
  const showMessageError = (message: string) => {
    toast.add({
      type: "error",
      description: message,
      priority: "high",
    });
  };

  const showMessageSuccess = (message: string) => {
    toast.add({
      type: "success",
      description: message,
    });
  };

  const showMessageInfo = (message: string) => {
    toast.add({
      type: "info",
      description: message,
    });
  };

  return {
    showMessageError,
    showMessageSuccess,
    showMessageInfo,
  };
};
