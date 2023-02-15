import { useUserAuth } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import { db } from "@/firebaseUtils/firebase";
import { collection, getDocs } from "firebase/firestore";
import NavBar from "@/components/coreComponents/NavBar";

export default function Browse() {
  const [instructionals, setInstructionals] = useState<any[]>([]);
  const getData = async () => {
    const dataSnapshot = await getDocs(collection(db, "guides"));
    dataSnapshot.forEach((doc) => {
      //   console.log(doc.id, "=>", doc.data());
      setInstructionals((prevArray) => [...prevArray, doc.data()]);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-5">
        <ul className=" grid list-none grid-cols-2 gap-5">
          {!instructionals ? (
            <></>
          ) : (
            instructionals.map((item, idx) => {
              return (
                <li key={idx} className="rounded-lg border border-gray-800 p-3">
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
    </>
  );
}
