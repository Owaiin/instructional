import { usePostsContext } from "@/contexts/PostsContext";

export default function TestPage() {
  const { postArray, getData } = usePostsContext();

  return (
    <>
      <button
        className="border px-5 py-2"
        onClick={() => console.log(postArray)}
      >
        Log Post Array
      </button>
      <button className="border px-5 py-2" onClick={() => getData()}>
        Get Post Array
      </button>
    </>
  );
}
