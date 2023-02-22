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
