import { useUserAuth } from "@/contexts/UserContext";

export default function LogOut() {
  const { logOut, user } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("successfully logged out - user = ", user);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <>
      <button
        className=" bg-rose-500 px-5 py-2 text-white"
        onClick={() => handleLogout()}
      >
        LogOut
      </button>
    </>
  );
}
