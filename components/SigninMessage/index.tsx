import React from "react";
import { signIn } from "next-auth/client";
import Link from "next/link";

export const SigninMessage = () => {
  return (
    <div className="flex text-gray-300 justify-between items-center md:border-2 lg:border-2 md:border-gray-500 lg:border-gray-500 p-4 m-auto w-full md:w-4/5 lg:w-4/5 rounded">
      <h1 className="text-xs md:text-md lg:text-xl w-1/2">
        Login to leave a comment!
      </h1>
      <div className="flex w-full justify-end">
        <button
          onClick={() => signIn()}
          className="px-2 py-1 bg-gray-700 rounded m-2 text-sm lg:text-lg"
        >
          Login
        </button>
        <button className="px-2 py-1 bg-black rounded m-2">
          <Link href="/">
            <a className="text-xs text-gray-400 lg:text-lg">Go Back</a>
          </Link>
        </button>
      </div>
    </div>
  );
};
