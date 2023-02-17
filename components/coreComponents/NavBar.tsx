import { useUserAuth } from "@/contexts/UserContext";
import LogIn from "../authComponents/LogIn";
import { RiMenu5Fill, RiCloseFill } from "react-icons/ri";
import NavMenu from "./NavMenu";
import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const { user } = useUserAuth();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-screen py-2 px-2">
        <div className="container mx-auto flex justify-between text-2xl">
          <Link href="/">
            {" "}
            <h1 className=" cursor-pointer font-bold text-gray-800">
              Instructional
            </h1>{" "}
          </Link>

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
      </nav>
      {navOpen ? <NavMenu setNav={() => setNavOpen(false)} /> : <></>}
    </>
  );
}
