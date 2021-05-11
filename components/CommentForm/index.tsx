import React from "react";

export const CommentForm = () => {
  return (
    <div className="flex flex-col w-full md:w-4/5 lg:w-4/5 m-auto">
      <div className="flex w-full">
        <textarea
          className="flex h-32 text-white bg-gray-800 px-4 py-2 w-full focus:outline-none cursor-default hover:bg-gray-700 transition duration-200 ease-in"
          placeholder="Leave a comment..."
        />
        {/* <FaTimes size={30} color="gray" className="bg-gray-100 h-10 p-2" /> */}
      </div>
      <button className="bg-gray-900 md:bg-blue-800 lg:bg-blue-800 md:hover:bg-blue-600 lg:hover:bg-blue-600 mt-4 text-white font-semibold px-4 py-2 rounded focus:outline-none transition duration-500 ease-in">
        Send
      </button>
    </div>
  );
};
