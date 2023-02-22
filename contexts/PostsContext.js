import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/firebaseUtils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useUserAuth } from "@/contexts/UserContext";

const postsContext = createContext();

export function PostContextProvider({ children }) {
  const [postArray, setPostArray] = useState([]);

  const getData = async () => {
    const dataSnapshot = await getDocs(collection(db, "guides"));
    dataSnapshot.forEach((doc) => {
      //   console.log(doc.id, "=>", doc.data());
      setPostArray((prevArray) => [
        ...prevArray,
        { id: doc.id, data: doc.data() },
      ]);
    });
    // console.log("getDataReached");
    // console.log(dataSnapshot.docs);
  };

  useEffect(() => {
    getData();
    // console.log("posts mounting");
  }, []);

  return (
    <postsContext.Provider value={{ getData, postArray, setPostArray }}>
      {children}
    </postsContext.Provider>
  );
}

export function usePostsContext() {
  return useContext(postsContext);
}
