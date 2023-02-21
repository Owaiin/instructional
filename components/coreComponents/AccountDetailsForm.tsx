import { RiCloseFill } from "react-icons/ri";

export default function AccountDetailsForm(props: {
  title: string;
  closeToggle: any;
  emailInput: any;
  passwordInput: any;
  submit: any;
}) {
  return (
    <>
      <div className="absolute top-0 left-0 z-30 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-50 px-5">
        <div className=" grid w-full rounded-xl bg-white p-3 shadow-md lg:w-1/4 lg:p-5">
          <div className="flex w-full justify-between text-xl">
            <p className="mb-5  font-semibold text-gray-800">{props.title}</p>
            <RiCloseFill
              className=" cursor-pointer"
              onClick={props?.closeToggle}
            />
          </div>
          <form
            className="flex w-full flex-col items-center gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              props.submit();
            }}
          >
            <div className="flex w-full flex-col">
              <label className="font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                className="border p-2"
                type="email"
                onChange={(e) => props.emailInput(e)}
              />
            </div>
            <div className="flex w-full flex-col">
              <label className="font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="border p-2"
                type="password"
                onChange={(e) => props.passwordInput(e)}
              />
            </div>
            <button className=" block rounded-lg border bg-blue-500 px-5 py-2 font-medium  tracking-widest text-white transition-all duration-200 ease-in-out hover:bg-green-500">
              {props.title}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
