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

export default function Home() {
  const { user } = useUserAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (user) {
  //     router.push("/user/profile");
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <header className="h-screen w-full">
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-2 text-center">
          <h1 className="mb-3 text-5xl font-bold text-gray-800">
            Instructional
          </h1>
          <p className="mb-3 text-lg leading-8">
            Put together guides and tutorials quickly, easily, and beautifully.
          </p>
          <Link href="/create-guide">
            <button className=" rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2  font-medium tracking-wider text-white shadow-lg transition-all  hover:from-yellow-400 hover:to-orange-500">
              Create
            </button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto">
        <SignUp />
        <div>
          <p>-----------</p>
        </div>
        <LogIn />
      </main>
    </>
  );
}
