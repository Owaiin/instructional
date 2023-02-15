import { useState } from "react";
import { useUserAuth } from "@/contexts/UserContext";

export default function SignUp() {
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
      <p>SignUp</p>
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
          <button className=" block rounded-lg border px-5 py-2">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
