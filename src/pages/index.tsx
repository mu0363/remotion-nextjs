import { useRouter } from "next/router";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="w-72">
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
        <button
          className="rounded-md bg-orange-400 py-2 px-4 text-white"
          onClick={() => router.push("/dashboard").catch(() => console.info("redirected to dashboard"))}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Home;
