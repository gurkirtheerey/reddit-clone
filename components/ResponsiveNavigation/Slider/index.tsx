import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import { FaTimes } from "react-icons/fa";
import styles from "./Slider.module.css";

interface SliderProps {
  onClick: () => void;
}

export const Slider: React.FC<SliderProps> = ({ onClick }) => {
  const [session] = useSession();
  return (
    <div className={`${styles.container} absolute bg-gray-200 w-full h-1/2`}>
      <div className="flex flex-col justify-evenly items-center h-full">
        <h2 className="font-bold text-xl">
          <Link href="/">
            <a>Postify</a>
          </Link>
        </h2>
        <div className="w-full">
          <input
            className="w-full py-2 px-4 text-black focus:outline-none text-center"
            type="text"
            placeholder="Search Subthreads"
          />
        </div>
        <div className="w-full">
          {!session ? (
            <button
              onClick={() => signIn()}
              className="w-full bg-gray-200 py-2 px-4 focus:outline-none"
            >
              Sign in
            </button>
          ) : (
            <div className="flex flex-col w-full text-gray-500">
              <button className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 my-2 focus:outline-none">
                Create Post
              </button>
              <button
                onClick={() => signOut()}
                className="bg-gray-200 hover:bg-gray-300 py-2 px-4 my-2 focus:outline-none"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
        <button
          className="w-1/2 flex justify-center p-2 rounded"
          onClick={onClick}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};
