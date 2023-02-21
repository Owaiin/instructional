import { useState } from "react";
import { useUserAuth } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import AccountDetailsForm from "../coreComponents/AccountDetailsForm";

export default function LogIn(props: { setOpen: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    setError("");
    try {
      await logIn(email, password);
      console.log("success - logged in!");
      router.push("/user/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* <p>LogIn</p>
      <div>
        <form
          className="grid w-full gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              className="border p-2"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="border p-2"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className=" rounded-lg border px-5 py-2">Sign Up</button>
        </form>
      </div> */}
      <AccountDetailsForm
        title="Login"
        closeToggle={props.setOpen}
        emailInput={(e: any) => setEmail(e.target.value)}
        passwordInput={(e: any) => setPassword(e.target.value)}
        submit={(e: any) => {
          handleSubmit(e);
        }}
      />
    </>
  );
}
