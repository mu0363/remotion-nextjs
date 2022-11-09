import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutateAuth } from "src/libs/hooks/useMutateAuth";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();
  const { session, signInWithGoogle } = useMutateAuth();

  useEffect(() => {
    if (session) {
      router.push("/dashboard").catch(() => console.info("redirected to dashboard"));
    }
  }, [router, session]);

  return (
    <div className="w-72">
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
        <button className="rounded-md bg-orange-400 py-2 px-4 text-white" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Home;
