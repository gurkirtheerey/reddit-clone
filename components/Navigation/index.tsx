import React from "react";
import { signIn, useSession, signOut } from "next-auth/client";

export const Navigation = () => {
  const [session] = useSession();

  return (
    <div className="bg-gray-700 text-white flex justify-between items-center p-4">
      <h2 className="font-bold text-xl">Postify</h2>
      <div className="w-1/3">
        <input
          className="w-full py-2 px-4 rounded text-black focus:outline-none"
          type="text"
          placeholder="Search Subthreads"
        />
      </div>
      <div>
        {!session ? (
          <button
            onClick={() => signIn()}
            className="bg-gray-500 hover:bg-gray-600 py-2 px-4 m-2 rounded focus:outline-none"
          >
            Sign in
          </button>
        ) : (
          <div>
            <button className="bg-gray-500 hover:bg-gray-600 py-2 px-4 m-2 rounded focus:outline-none">
              Create Post
            </button>
            <button
              onClick={() => signOut()}
              className="bg-gray-500 hover:bg-gray-600 py-2 px-4 m-2 rounded focus:outline-none"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
