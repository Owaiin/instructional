import { useState } from "react";

export default function RequiredSignup() {
  const [displayName, setDisplayName] = useState("");

  return (
    <>
      <h3>You need to have a Display Handle before you can publish</h3>
      <p>
        For now, once you've set your display handle you won't be able to change
        it again.
      </p>
      <form action="">
        <label htmlFor="display-handle">Display Handle</label>
        <input type="text" onChange={(e) => setDisplayName(e.target.value)} />
        <button>Create!</button>
      </form>
    </>
  );
}
