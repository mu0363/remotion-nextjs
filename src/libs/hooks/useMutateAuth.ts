import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const useMutateAuth = () => {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) throw new Error(error.message);
  };

  const signout = async () => {
    await supabase.auth.signOut();
    await router.push("/");
  };

  return {
    signInWithGoogle,
    signout,
    session,
  };
};
