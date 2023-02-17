import { useUserAuth } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/coreComponents/NavBar";
import { db } from "@/firebaseUtils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { usePostsContext } from "@/contexts/PostsContext";
import { RiDeleteBin7Line } from "react-icons/ri";
import SmallCard from "@/components/coreComponents/Cards";

export default function Profile() {
  const { user } = useUserAuth();
  const { postArray, setPostArray } = usePostsContext();
  const router = useRouter();

  // Remove a guide from firestore
  const removeDoc = async (docId: string) => {
    await deleteDoc(doc(db, "guides", docId));
  };

  // If user isn't signed in - redirect to home page - otherwise, getUserDocs on mount
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <main className="mt-20">
        <div className="container mx-auto mb-20 px-2">
          <h1 className="mb-5 text-4xl font-bold text-gray-800">
            {user && user.uid}
          </h1>
          <p>
            <span className="font-semibold text-gray-800">Email: </span>
            {user && user.email}
          </p>
        </div>
        {/* User Posts */}
        <div className="container mx-auto">
          <ul className=" grid list-none grid-cols-2 gap-5">
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
      </main>
    </>
  );
}
