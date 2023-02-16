import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserAuthContextProvider } from "../contexts/UserContext";
import { PostContextProvider } from "../contexts/PostsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserAuthContextProvider>
        <PostContextProvider>
          <Component {...pageProps} />
        </PostContextProvider>
      </UserAuthContextProvider>
    </>
  );
}
