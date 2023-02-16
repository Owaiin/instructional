import { db } from "@/firebaseUtils/firebase";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export async function getAllPostIds() {
  const [postArray, setPostArray] = useState([]);
  const dataSnapshot = await getDocs(collection(db, "guides"));
  dataSnapshot.forEach((doc) => {
    setPostArray((prevArray) => [...prevArray, doc.data()]);
  });
  return postArray.map((post) => {
    return {
      params: {
        id: post.uid,
      },
    };
  });
}
