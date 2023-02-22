import { useUserAuth } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/coreComponents/NavBar";
import { db } from "@/firebaseUtils/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { usePostsContext } from "@/contexts/PostsContext";
import SmallCard from "@/components/coreComponents/Cards";
import MainContainer from "@/components/coreComponents/MainContainer";
import H1 from "@/components/coreComponents/styleComponents/H1";

export default function Profile() {
  const { user, updateUserName } = useUserAuth();
  const { postArray, setPostArray } = usePostsContext();
  const [userName, setUserName] = useState("");
  const router = useRouter();

  // Remove a guide from firestore
  const removeDoc = async (docId: string) => {
    await deleteDoc(doc(db, "guides", docId));
  };

  // If user isn't signed in - redirect to home page - otherwise, getUserDocs on mount
  useEffect(() => {
    if (user === null) {
      console.log("triggered useEffect");
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <MainContainer>
        <div>
          <H1 text="Profile" />
        </div>
        {/* User Posts */}
        <div className="container mx-auto">
          <ul className=" grid list-none grid-cols-2 gap-5 lg:grid-cols-4">
            {postArray &&
              // filter the postArray to display only posts that with a user field that matches the user uid
              postArray
                .filter((post: any) => post.data.user === user.uid)
                .map((item: any, idx: number) => {
                  return (
                    <SmallCard
                      key={idx}
                      title={item.data.name}
                      description={item.data.description}
                      delete={true}
                      postId={item.id}
                      onSmash={() => {
                        removeDoc(item.id);
                        setPostArray(
                          postArray.filter(
                            (userDoc: any) => userDoc.id !== item.id
                          )
                        );
                      }}
                    />
                  );
                })}
          </ul>
        </div>
      </MainContainer>
    </>
  );
}
