import Link from "next/link";
import LogOut from "../authComponents/LogOut";
import { useUserAuth } from "@/contexts/UserContext";

export default function NavMenu(props: { setNav: any }) {
  const { user } = useUserAuth();

  return (
    <>
      <div className="absolute top-0 left-0 z-40 flex h-screen w-screen flex-col items-center justify-center bg-white text-center">
        <ul className="grid gap-12 text-2xl font-bold text-gray-500">
          <Link onClick={props.setNav} href="/">
            <li className="cursor-pointer transition-all duration-300 ease-in-out  hover:text-gray-900">
              Home
            </li>
          </Link>
          <Link onClick={props.setNav} href="/browse">
            <li className="cursor-pointer transition-all duration-300 ease-in-out  hover:text-gray-900">
              Browse
            </li>
          </Link>
          <Link onClick={props.setNav} href="/create-guide">
            <li className="cursor-pointer transition-all duration-300 ease-in-out  hover:text-gray-900">
              Create
            </li>
          </Link>
          {user ? (
            <Link onClick={props.setNav} href="/user/profile">
              <li className="cursor-pointer transition-all duration-300 ease-in-out  hover:text-gray-900">
                Profile
              </li>
            </Link>
          ) : (
            <></>
          )}

          {user ? (
            <LogOut />
          ) : (
            <li className="cursor-pointer transition-all duration-300 ease-in-out hover:text-gray-900 ">
              SignUp | Login
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
