import { onAuthStateChanged, User } from "firebase/auth";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { ColorModal } from "../component/ColorModal";
import { Header } from "../component/Header";
import { Loading } from "../component/Loading";
import { ScoreModal } from "../component/ScoreModal";
import { useStore } from "../Firebase";
import { firebaseAuth } from "../Firebase/firebase";

export default function Home() {
  const [user, setUser] = useState<User | null>();

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const [score, setScore] = useState<number>(0);
  const {
    unityProvider,
    isLoaded,
    addEventListener,
    removeEventListener,
    sendMessage,
  } = useUnityContext({
    loaderUrl: "/Build/kyutechHack.loader.js",
    dataUrl: "/Build/kyutechHack.data",
    frameworkUrl: "/Build/kyutechHack.framework.js",
    codeUrl: "/Build/kyutechHack.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });
  const [devicePixelRatio, setDevicePixelRatio] = useState(0);
  const [colorOpen, setColorOpen] = useState<boolean>(false);
  const [scoreOpen, setScoreOpen] = useState<boolean>(false);

  const { createScore } = useStore();

  const handleGameOver = useCallback(
    async (score: number) => {
      setScore(score);
      await createScore(user, score);
      setScoreOpen(true);
    },
    [user]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDevicePixelRatio(window.devicePixelRatio);
    }
  }, []);

  useEffect(() => {
    addEventListener("Score", handleGameOver);
    return () => {
      removeEventListener("Score", handleGameOver);
    };
  }, [handleGameOver, addEventListener, removeEventListener]);

  return (
    <div>
      <Head>
        <title>Tiritsumo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header setColorOpen={setColorOpen} />
      <div>{user ? user.displayName : "null"}</div>
      <main className="w-full relative">
        {isLoaded === false && <Loading />}
        <Unity
          unityProvider={unityProvider}
          style={{
            height: "calc(100vh - 70px)",
            width: "100%",
          }}
          devicePixelRatio={devicePixelRatio}
        />
        <ColorModal
          open={colorOpen}
          setOpen={setColorOpen}
          isLoaded={isLoaded}
          sendMessage={sendMessage}
        />
        <ScoreModal
          open={scoreOpen}
          setOpen={setScoreOpen}
          score={score}
          sendMessage={sendMessage}
          isLoaded={isLoaded}
        />
      </main>
    </div>
  );
}
