import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import path from "path";
import { usePostsContext } from "@/contexts/PostsContext";
import { db } from "@/firebaseUtils/firebase";
import { doc, addDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import NavBar from "@/components/coreComponents/NavBar";
import Image from "next/image";

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
      <h1>{props.post.name}</h1>
      <p>{props.post.description}</p>
      <ul>
        {props.post.steps.map((step, idx) => {
          return (
            <>
              <li key={idx}>
                <p className="my-2 text-xl font-medium text-gray-800">
                  Step {step.id}
                </p>

                {step.imageUrl !== null ? (
                  <Image
                    src={step.imageUrl}
                    width={500}
                    height={500}
                    alt="alt image description"
                  />
                ) : (
                  <></>
                )}

                <p>{step.content}</p>
              </li>
            </>
          );
        })}
      </ul>
      <button onClick={() => console.log(props.post)}>Log post prop</button>
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
