import Head from "next/head";
import Image from "next/image";
import StepComponent from "@/components/StepComponent";
import { useState } from "react";
import { db } from "../firebaseUtils/firebase";
import { doc, addDoc, collection } from "firebase/firestore";
import NavBar from "@/components/coreComponents/NavBar";
import { useUserAuth } from "@/contexts/UserContext";
import { usePostsContext } from "@/contexts/PostsContext";
import MainContainer from "@/components/coreComponents/MainContainer";
import { useRouter } from "next/router";

export default function Home() {
  interface step {
    id: number;
    content: string;
    name: string;
    imageUrl: string;
  }
  const [stepArray, setStepArray] = useState<step[]>([
    { id: 0, content: "", name: "", imageUrl: "" },
  ]);
  const [instructionalName, setInstructionalName] = useState("");
  const [instructional, setInstructional] = useState({});
  const [description, setDescription] = useState("");
  const { user } = useUserAuth();
  const { setPostArray, getData } = usePostsContext();
  const router = useRouter();

  // Add another step into the StepArray
  const addToStepArray = (input: any) => {
    setStepArray((prevArr) => [...prevArr, input]);
  };

  // Set the input for the Name state of the instructional
  const handleInstructionalName = (e: any) => {
    const value = e.target.value;
    setInstructionalName(value);
  };

  // Handle instructional Description state
  const handleDescription = (e: any) => {
    const value = e.target.value;
    setDescription(value);
  };

  // Build the instructional object
  const saveInstructional = () => {
    setInstructional({
      name: instructionalName,
      description: description,
      steps: stepArray,
      user: user.uid,
      userName: user.displayName,
    });
  };

  // Send the instructional to Firestore
  const sendInstructional = async () => {
    await addDoc(collection(db, "guides"), {
      name: instructionalName,
      description: description,
      steps: stepArray,
      user: user.uid,
      userName: user.displayName,
    });
  };

  return (
    <>
      <Head>
        <title>Create an Instructional</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <MainContainer>
        <input
          className="my-5 block w-full bg-transparent text-2xl font-semibold"
          type="text"
          placeholder="Instructional Name..."
          onChange={(e) => handleInstructionalName(e)}
        />
        <textarea
          className="mb-5 block w-full rounded border bg-transparent p-2"
          name="text"
          onChange={(e) => handleDescription(e)}
          placeholder="Description..."
        />

        <div className="mx-auto">
          {stepArray.length === 0 ? (
            <StepComponent
              stepArray={stepArray}
              setStepArray={setStepArray}
              pullData={addToStepArray}
              stepNumber={1}
            />
          ) : (
            stepArray.map((step, idx) => {
              return (
                <StepComponent
                  stepNumber={idx + 1}
                  key={idx}
                  pullData={addToStepArray}
                  stepArray={stepArray}
                  setStepArray={setStepArray}
                />
              );
            })
          )}
        </div>
        <button
          className="block rounded-2xl border border-slate-700 px-5 py-2"
          onClick={() => {
            // Need to put this into a single handler but it works for now
            saveInstructional();
            sendInstructional();
            setPostArray([]);
            getData();
          }}
        >
          Save Instructional
        </button>
      </MainContainer>
    </>
  );
}
