import { toast } from "@/components/ui/toast";

export const useMessage = () => {
    const showMessageError = (message: string) => {
        toast.add({
        type: "error",
        description: message,
        priority: "high",
      });
    }

    const showMessageSuccess = (message: string) => {
        toast.add({
            type: "success",
            description: message,
          })
    }

    return {
        showMessageError,
        showMessageSuccess
    }
}