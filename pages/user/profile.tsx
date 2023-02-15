import { useUserAuth } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/coreComponents/NavBar";
import { db } from "@/firebaseUtils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Profile() {
  interface userGuide {
    uid: string;
    content: string;
    steps: [];
  }
  const { user, logOut, userDocs, setUserDocs } = useUserAuth();
  const [userGuides, setUserGuides] = useState<any[]>([]);
  const router = useRouter();
  const [userId, setUserId] = useState();

  const getUserDocs = async (uid: string) => {
    const q = await query(collection(db, "guides"), where("user", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setUserDocs((prevArray: any) => [...prevArray, doc.data()]);
    });
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (user.uid != null && userDocs.length === 0) {
      getUserDocs(user.uid);
    }
  }, [user, userDocs]);

  return (
    <>
      <NavBar />
      <main className="mt-20">
        <div className="container mx-auto px-2">
          {" "}
          {!user ? (
            <></>
          ) : (
            <>
              <h1>{user ? "logged in" : "logged out"}</h1>
            </>
          )}
          {/* <p>{user.uid}</p> */}
          <button onClick={() => console.log(userDocs)}>Log user</button>
        </div>
        <div className="container mx-auto">
          <ul className=" grid list-none grid-cols-2 gap-5">
            {!userDocs ? (
              <></>
            ) : (
              userDocs.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="rounded-lg border border-gray-800 p-3"
                  >
                    <h3 className="text-2xl font-bold text-gray-700">
                      {item.name}
                    </h3>
                    <p className="text-gray-700">{item.description}</p>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </main>
    </>
  );
}
