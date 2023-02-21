import { type } from "os";
import { useState, useRef } from "react";
import { storage } from "@/firebaseUtils/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";

export default function StepComponent(props: {
  stepNumber: number;
  pullData: any;
  setStepArray: [];
  stepArray: [];
}) {
  const [typeContent, setTypeContent] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const editElement = useRef();

  const typeHandler = (e: any) => {
    const value = e.target.value;
    setTypeContent(value);
    // props.pullData(typeContent);
  };

  const handleImageUpload = (e: any) => {
    e.preventDefault();
    // save the uploaded file to a variable
    const file = e.target[0]?.files[0];

    if (!file) return;
    if (file.size > 5242880) {
      return alert("file is too big! maximum file size is 5MB");
    }
    // Create a reference in storage for the file
    const storageRef = ref(storage, `files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          console.log("Upload done, url here:", downloadURL);
        });
      }
    );
  };

  return (
    <>
      <div className=" my-3 h-full w-full rounded-2xl border border-blue-500 p-5">
        <h3 className="mb-2 text-lg font-medium">Step {props.stepNumber} </h3>
        {/* image upload */}
        {imgUrl !== null ? (
          <></>
        ) : (
          <p className="mb-2 font-medium text-gray-800">Upload an image</p>
        )}

        <div className="mb-5">
          {imgUrl !== null ? (
            <Image
              src={imgUrl}
              width={500}
              height={500}
              alt="test Alt"
              className=""
            />
          ) : (
            <>
              <form className="" onSubmit={(e) => handleImageUpload(e)}>
                <input type="file" accept=".jpg, .jpeg, .png" />
                <button
                  className="mt-2 mb-5 w-full rounded-2xl border border-blue-500 px-5 py-2 font-medium transition-all duration-200 ease-in-out hover:bg-blue-500 hover:text-white"
                  type="submit"
                >
                  Upload file
                </button>
              </form>
            </>
          )}
        </div>

        {isEditable ? (
          <textarea
            className="h-full w-full rounded-2xl border p-5"
            name="text"
            placeholder="Type step info here"
            onChange={(e) => typeHandler(e)}
          />
        ) : (
          <div>
            <p>{typeContent}</p>
          </div>
        )}

        {isEditing ? (
          <input
            className="h-full w-full rounded-2xl border p-5"
            type="text"
            placeholder={typeContent}
            onChange={(e) => typeHandler(e)}
          />
        ) : (
          <></>
        )}

        <div className="flex w-full justify-between pt-3">
          {isEditable ? (
            <button
              className="rounded-2xl  bg-blue-500 px-5 py-2 font-medium tracking-wider text-white transition-all duration-200 ease-in-out hover:bg-green-500"
              onClick={() => {
                props.pullData({
                  id: props.stepNumber,
                  content: typeContent,
                  imageUrl: imgUrl,
                });
                setIsEditable(false);
              }}
            >
              Add Next Step
            </button>
          ) : (
            <></>
          )}
          {/* 
          <button
            className="rounded-2xl border border-blue-200 px-5 py-2"
            onClick={() => console.log(props.stepArray)}
          >
            Log Step Array
          </button> */}
        </div>
      </div>
    </>
  );
}
