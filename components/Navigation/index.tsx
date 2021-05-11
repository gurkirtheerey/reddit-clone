import React from "react";
import { signIn, useSession, signOut } from "next-auth/client";
import Link from "next/link";

export const Navigation = () => {
  const [session] = useSession();

  return (
    <div className="bg-gray-800 text-white flex justify-between items-center p-4">
      <h2 className="font-bold text-xl">
        <Link href="/">
          <a className="transition duration-200 ease-in hover:text-gray-400 cursor-default">
            Postify
          </a>
        </Link>
      </h2>
      <div className="w-1/3">
        <input
          className="w-full py-2 px-4 font-bold rounded text-gray-400 focus:outline-none cursor-default bg-gray-900"
          type="text"
          placeholder="Search Subthreads"
        />
      </div>
      <div>
        {!session ? (
          <button
            onClick={() => signIn()}
            className="bg-gray-700 hover:bg-gray-900 py-2 px-4 m-2 rounded focus:outline-none transition duration-200 ease-in"
          >
            Sign in
          </button>
        ) : (
          <div>
            <button className="bg-gray-700 hover:bg-gray-900 py-2 px-4 m-2 rounded focus:outline-none transition duration-200 ease-in">
              <Link href="/post">
                <a>Create Post</a>
              </Link>
            </button>
            <button
              onClick={() => signOut()}
              className="bg-gray-700 hover:bg-gray-900 py-2 px-4 m-2 rounded focus:outline-none transition duration-200 ease-in"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
