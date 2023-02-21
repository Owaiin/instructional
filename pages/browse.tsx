import { useUserAuth } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import { db } from "@/firebaseUtils/firebase";
import { collection, getDocs } from "firebase/firestore";
import NavBar from "@/components/coreComponents/NavBar";
import { usePostsContext } from "@/contexts/PostsContext";
import SmallCard from "@/components/coreComponents/Cards";
import MainContainer from "@/components/coreComponents/MainContainer";
import { Main } from "next/document";

export default function Browse() {
  const [instructionals, setInstructionals] = useState<any[]>([]);
  const { postArray, getData } = usePostsContext();

  return (
    <>
      <NavBar />
      <MainContainer>
        <ul className=" grid list-none grid-cols-2 gap-5 xl:grid-cols-4">
          {postArray &&
            postArray.map((item: any, idx: number) => {
              return (
                <SmallCard
                  key={idx}
                  title={item.data.name}
                  description={item.data.description}
                  postId={item.id}
                />
              );
            })}
        </ul>
        <button onClick={() => console.log(postArray)}>log posts</button>
      </MainContainer>
    </>
  );
}
