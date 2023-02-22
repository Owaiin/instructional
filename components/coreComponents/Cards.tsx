import { RiDeleteBin7Line } from "react-icons/ri";
import Link from "next/link";

export default function SmallCard(props: {
  title: string;
  description: string;
  //   to show the delete icon
  delete: boolean;
  //   for on click
  onSmash: any;
  // post ID
  postId: string;
}) {
  return (
    <>
      <div className="relative h-full w-full">
        <button
          className=" absolute right-0 z-50 my-2 mr-2 mt-2 text-xl"
          onClick={props?.onSmash}
        >
          {props?.delete && (
            <RiDeleteBin7Line className="  cursor-pointer text-2xl hover:text-rose-400" />
          )}
        </button>

        <Link href={`/posts/${props?.postId}`}>
          <div className="h-full w-full rounded-lg border border-gray-800 p-3 transition-all duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-500 hover:text-white">
            <div className="flex w-full items-start justify-between">
              <h3 className="text-2xl font-bold">{props?.title}</h3>
            </div>

            <p>{props?.description}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
