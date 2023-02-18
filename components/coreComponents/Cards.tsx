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
      <div className="h-full w-full rounded-lg border border-gray-800 p-3">
        <div className="flex w-full items-center justify-between">
          <Link href={`/posts/${props.postId}`}>
            <h3 className="text-2xl font-bold text-gray-800">{props.title}</h3>
          </Link>
          <button className="my-2 text-xl" onClick={props?.onSmash}>
            {props?.delete && (
              <RiDeleteBin7Line className=" transition-all duration-200 ease-in-out hover:text-rose-500" />
            )}
          </button>
        </div>

        <p>{props.description}</p>
      </div>
    </>
  );
}
