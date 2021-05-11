import React from "react";

export const CommentForm = () => {
  return (
    <div className="flex flex-col w-full md:w-4/5 lg:w-4/5 m-auto">
      <div className="flex w-full">
        <textarea
          className="flex text-white bg-gray-800 px-4 py-2 w-full focus:outline-none cursor-default"
          placeholder="Leave a comment..."
        />
        {/* <FaTimes size={30} color="gray" className="bg-gray-100 h-10 p-2" /> */}
      </div>
      <button className="bg-gray-900 md:bg-blue-800 lg:bg-blue-800 md:hover:bg-blue-900 lg:hover:bg-blue-900 mt-2 text-white font-semibold px-4 py-2 rounded focus:outline-none">
        Send
      </button>
    </div>
  );
};
