import React, { useState } from "react";
import { CommentProps } from "../../types/CommentProps";
import { FaArrowUp, FaArrowDown, FaRocketchat } from "react-icons/fa";

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { image, name, email } = comment?.author;
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full bg-gray-800 flex flex-col my-1 md:my-4 lg:my-4 md:rounded-lg lg:rounded-lg">
      <div className="text-white flex ">
        <div className="flex flex-col items-center justify-evenly p-2 h-24">
          <FaArrowUp className="cursor-pointer" size={18} />
          <span className="text-sm font-semibold">0</span>
          <FaArrowDown className="cursor-pointer" size={18} />
        </div>
        <div className="flex flex-col items-start justify-evenly">
          <div className="flex items-center m-1 md:m-4 lg:m-4">
            <img src={image} height={40} width={40} className="rounded-full" />
            <span className="ml-2 text-xs truncate">
              {email} | {name}
            </span>
          </div>
          <div className="flex flex-col justify-between ml-4">
            <span className="my-4 md:font-semibold lg:font-semibold text-xs md:text-sm lg:text-sm">
              {comment.comment}
            </span>
            <div
              className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded text-xs mb-2 cursor-pointer hover:bg-gray-900"
              onClick={() => setOpen(!open)}
            >
              <FaRocketchat />
              <span className="px-2">Reply</span>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="flex flex-col p-4">
          <textarea
            className="w-full bg-gray-800 p-4 text-sm"
            placeholder="Comment..."
          />
          <div className="flex w-full justify-end mt-4">
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded mr-2 text-sm">
              Send
            </button>
            <button
              onClick={() => setOpen(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
