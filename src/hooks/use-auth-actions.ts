import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import type { AuthError } from "firebase/auth";
import { useState } from "react";
import { useAuth } from "reactfire";

interface AuthActionRespose {
  success: boolean;
  error: AuthError | null;
}

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const login = async (data: {
    email: string;
    password: string;
  }): Promise<AuthActionRespose> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    displayName: string;
  }): Promise<AuthActionRespose> => {
    setLoading(true);
    try {
      const currentUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      if (currentUser.user) {
        await updateProfile(currentUser.user, {
          displayName: data.displayName,
        });

        //Forzar la recarfa del usuario para sincronizar con ReactFire
        await currentUser.user.reload();
      }

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<AuthActionRespose> => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return {
        success: true,
        error: null
      }
    } catch (error) {
        const authError = error as AuthError;
        return {
            success: false,
            error: authError
        }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () : Promise<void> => {
    setLoading(true);
    try {
       await signOut(auth);
    } catch (error) {
        console.error("Error during logout: ", error);
    }finally {
        setLoading(false); 
    }
  }

  return {
    loading,
    login,
    register,
    loginWithGoogle,
    logout
  };
};
