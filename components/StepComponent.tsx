import { type } from "os";
import { useState, useRef } from "react";

export default function StepComponent(props: {
  stepNumber: number;
  pullData: any;
  setStepArray: [];
  stepArray: [];
}) {
  const [typeContent, setTypeContent] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const editElement = useRef();

  const typeHandler = (e: any) => {
    const value = e.target.value;
    setTypeContent(value);
    // props.pullData(typeContent);
  };

  return (
    <>
      <div className=" my-3 h-full w-full rounded-2xl border border-blue-200 p-5">
        <h3 className="mb-2 text-lg font-medium">Step {props.stepNumber} </h3>
        {isEditable ? (
          <input
            className="h-full w-full rounded-2xl border p-5"
            type="text"
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
              className="rounded-2xl border border-blue-200 px-5 py-2"
              onClick={() => {
                props.pullData({ id: props.stepNumber, content: typeContent });
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
