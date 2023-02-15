import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import StepComponent from "@/components/StepComponent";
const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";
import { db } from "../firebaseUtils/firebase";
import { doc, addDoc, collection } from "firebase/firestore";
import NavBar from "@/components/coreComponents/NavBar";
import { useUserAuth } from "@/contexts/UserContext";

export default function Home() {
  interface step {
    id: number;
    content: string;
  }
  const [stepArray, setStepArray] = useState<step[]>([{ id: 0, content: "" }]);
  const [instructionalName, setInstructionalName] = useState("");
  const [instructional, setInstructional] = useState({});
  const [description, setDescription] = useState("");
  const { user } = useUserAuth();

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
    });
  };

  // Send the instructional to Firestore
  const sendInstructional = async () => {
    await addDoc(collection(db, "guides"), {
      name: instructionalName,
      description: description,
      steps: stepArray,
      user: user.uid,
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <NavBar />
        <button
          onClick={() =>
            console.log(stepArray, instructional, instructionalName)
          }
          className=" mb-5  border px-3 py-2"
        >
          Log the instructional
        </button>
      </header>
      <main>
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-slate-700">
            Create Instructional
          </h1>
          <input
            className="my-5 block w-full bg-transparent text-2xl font-semibold"
            type="text"
            placeholder="Type Name Here..."
            onChange={(e) => handleInstructionalName(e)}
          />
          <input
            className="mb-5 block bg-transparent"
            type="text"
            onChange={(e) => handleDescription(e)}
            placeholder="Type description here"
          />

          <button
            className="block rounded-2xl border border-slate-700 px-5 py-2"
            onClick={() => {
              saveInstructional();
              sendInstructional();
            }}
          >
            Save Instructional
          </button>

          <div className="mx-auto w-1/2">
            {!stepArray ? (
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
        </div>
      </main>
    </>
  );
}
