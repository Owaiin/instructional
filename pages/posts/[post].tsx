import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import path from "path";
// import { usePostsContext } from "@/contexts/PostsContext";

interface postInterface {
  id: string;
  data: {
    name: string;
    description: string;
    steps: [id: number, content: string];
    userId: string;
  };
}
// const { postArray } = usePostsContext();

export default function PostPage() {
  return (
    <>
      <h1>Demo</h1>
    </>
  );
}
