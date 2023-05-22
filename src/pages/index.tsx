import { useRouter } from "next/router";
import { AvantIcon, GoogleLogoIcon } from "src/components/SVG";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="w-72">
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h1 className="mb-3 text-base font-bold">動画生成サービス</h1>
        <AvantIcon className="mb-14 h-16 w-60" />
        <button
          className="mb-10 flex items-center space-x-5 rounded-lg border bg-white px-5 py-4 hover:bg-gray-100"
          onClick={() => router.push("/dashboard").catch(() => console.info("redirected to dashboard"))}
        >
          <GoogleLogoIcon className="h-6 w-6" />
          <p className="font-bold text-gray-700">Sign in with Google</p>
        </button>
        <div className="text-sm">
          <p>ポートフォリオ用のため認証機能の実装は外しております。</p>
          <p>ボタンクリックでそのまま遷移できます。</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
