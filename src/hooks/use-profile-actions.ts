import { useState } from "react";
import { useUser } from "reactfire";
import { updateProfile } from "firebase/auth";
import { useUserActions } from "./use-user-actions";

export interface IResultUpdateProfile {
  success: boolean;
}

export const useProfileAtions = () => {
  const [loading, setLoading] = useState(false);

   const { createOrUpdateUser } = useUserActions();
   
  const { data: user } = useUser();

  const updateUserProfile = async (data: {
    displayName?: string;
    photoUrl?: string;
  }): Promise<IResultUpdateProfile> => {
    setLoading(true);

    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }

      await updateProfile(user, {
        displayName: data.displayName || user.displayName,
        photoURL: data.photoUrl || user.photoURL,
      });

      await createOrUpdateUser({
        ...user,
        ...data
      })

      return {
        success: true,
      };
    } catch (error) {
      console.log("Error updating profile: ", error);
      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUserProfile,
    loading,
  };
};
