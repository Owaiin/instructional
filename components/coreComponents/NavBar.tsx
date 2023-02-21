import { useUserAuth } from "@/contexts/UserContext";
import LogIn from "../authComponents/LogIn";
import { RiMenu5Fill, RiCloseFill, RiAccountCircleLine } from "react-icons/ri";
import NavMenu from "./NavMenu";
import { useState } from "react";
import Link from "next/link";
import SignUp from "../authComponents/SignUp";

export default function NavBar() {
  const { user } = useUserAuth();
  const [navOpen, setNavOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-screen bg-white py-2 px-2 text-gray-800">
        <div className="container mx-auto flex items-center justify-between text-2xl">
          <Link href="/">
            {" "}
            <h1 className=" cursor-pointer font-bold text-gray-800">
              Instructional
            </h1>{" "}
          </Link>

          <div className="flex h-full">
            <RiAccountCircleLine
              onClick={() => setLoginOpen(true)}
              className="mr-5 cursor-pointer"
            />
            {!navOpen ? (
              <RiMenu5Fill
                onClick={() => setNavOpen(true)}
                className="cursor-pointer "
              />
            ) : (
              <RiCloseFill
                onClick={() => setNavOpen(false)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </nav>
      {signUpOpen ? <SignUp setOpen={() => setSignUpOpen(false)} /> : <></>}
      {loginOpen ? <LogIn setOpen={() => setLoginOpen(false)} /> : <> </>}
      {navOpen ? <NavMenu setNav={() => setNavOpen(false)} /> : <></>}
    </>
  );
}
