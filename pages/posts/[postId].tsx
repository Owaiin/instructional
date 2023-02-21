import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import path from "path";
import { usePostsContext } from "@/contexts/PostsContext";
import { db } from "@/firebaseUtils/firebase";
import { doc, addDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import NavBar from "@/components/coreComponents/NavBar";
import Image from "next/image";
import MainContainer from "@/components/coreComponents/MainContainer";
import H1 from "@/components/coreComponents/styleComponents/H1";
import H2 from "@/components/coreComponents/styleComponents/H2";

interface postInterface {
  id: string;
  data: {
    name: string;
    description: string;
    steps: [id: number, content: string, imageUrl: string];
    userId: string;
  };
}

export default function PostPage(props: { post: any }) {
  return (
    <>
      <NavBar />
      <MainContainer>
        <H1 text={props.post.name} />
        <p>{props.post.description}</p>
        <ul className="">
          {props.post.steps
            .filter((step: any) => step.id !== 0)
            .map((step: any, idx: number) => {
              return (
                <>
                  <li
                    className="  rounded-2xl bg-white p-5 shadow-2xl"
                    key={idx}
                  >
                    {step.imageUrl !== null ? (
                      <Image
                        src={step.imageUrl}
                        width={500}
                        height={500}
                        alt="alt image description"
                        className="mb-5 rounded-2xl"
                      />
                    ) : (
                      <></>
                    )}
                    <H2 text={`Step ${step.id}`} />
                    <p>{step.content}</p>
                  </li>
                </>
              );
            })}
        </ul>
        {/* <button onClick={() => console.log(props.post)}>Log post prop</button> */}
      </MainContainer>
    </>
  );
}

// Generates the available paths for routing
export async function getStaticPaths() {
  const dataSnapshot = await getDocs(collection(db, "guides"));
  const paths = dataSnapshot.docs.map((doc) => {
    return {
      params: {
        postId: `${doc.id}`,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

// Gets the data for the page from the context params "postId" which is the name of the page
export async function getStaticProps(context: any) {
  const { params } = context;
  const snapshot = await getDoc(doc(db, "guides", params.postId));
  const data = await snapshot.data();

  return {
    props: {
      post: data,
    },
  };
}
