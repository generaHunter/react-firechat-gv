import { useState } from "react";
import { useUser } from "reactfire";
import { updateProfile } from "firebase/auth";

export interface IResultUpdateProfile {
  success: boolean;
}

export const useProfileAtions = () => {
  const [loading, setLoading] = useState(false);
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
