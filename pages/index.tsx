import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import StepComponent from "@/components/StepComponent";
const inter = Inter({ subsets: ["latin"] });
import { useState, useEffect } from "react";
import { db } from "../firebaseUtils/firebase";
import { doc, addDoc, collection } from "firebase/firestore";
import Link from "next/link";
import SignUp from "@/components/authComponents/SignUp";
import LogIn from "@/components/authComponents/LogIn";
import LogOut from "@/components/authComponents/LogOut";
import { useUserAuth } from "@/contexts/UserContext";
import NavBar from "@/components/coreComponents/NavBar";
import { useRouter } from "next/router";
import SiteHead from "@/components/coreComponents/SiteHead";

export default function Home() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [signUpOpen, setSignUpOpen] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     router.push("/user/profile");
  //   }
  // }, []);

  return (
    <>
      <SiteHead
        title="Instructional | Create guides quick and easy"
        description="Create online guides and share them with whoever needs them"
        image=""
      />
      <NavBar />
      <header className="h-screen w-full">
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-2 text-center">
          <h1 className="mb-3 text-5xl font-bold text-gray-800">
            Instructional
          </h1>
          <p className="mb-3 text-lg leading-8">
            Put together guides and tutorials quickly and easily.
          </p>
          <div>
            <Link href="/create-guide">
              <button className=" rounded-2xl bg-blue-500 px-5  py-2 font-medium tracking-wider  text-white transition-all hover:bg-green-500">
                Create
              </button>
            </Link>
            {user ? (
              <button
                onClick={() => router.push("/browse")}
                className=" ml-5 rounded-2xl border px-5 py-2  font-medium tracking-wider   transition-all duration-300 ease-in-out  hover:bg-green-500 hover:text-white"
              >
                Browse
              </button>
            ) : (
              <button
                onClick={() => setSignUpOpen(true)}
                className=" ml-5 rounded-2xl border px-5 py-2  font-medium tracking-wider   transition-all duration-300 ease-in-out  hover:bg-green-500 hover:text-white"
              >
                SignUp
              </button>
            )}
          </div>
        </div>
      </header>
      {signUpOpen ? <SignUp setOpen={() => setSignUpOpen(false)} /> : <></>}
    </>
  );
}
