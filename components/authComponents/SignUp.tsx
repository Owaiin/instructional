import { useState } from "react";
import { useUserAuth } from "@/contexts/UserContext";
import { RiCloseFill } from "react-icons/ri";
import AccountDetailsForm from "../coreComponents/AccountDetailsForm";

export default function SignUp(props: { setOpen: any }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, user } = useUserAuth();

  const handleSubmit = async (e: any) => {
    setError("");
    try {
      await signUp(email, password);
      console.log("success fully signed up!", user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <AccountDetailsForm
        title="Sign Up"
        closeToggle={props?.setOpen}
        emailInput={(e: any) => setEmail(e.target.value)}
        passwordInput={(e: any) => setPassword(e.target.value)}
        submit={(e: any) => {
          e.preventDefault;
          handleSubmit(e);
        }}
      />
    </>
  );
}
