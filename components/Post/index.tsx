import React from "react";
import { PostProps } from "../../types/PostProps";
import { FaArrowUp, FaArrowDown, FaRocketchat } from "react-icons/fa";
import Image from "next/image";

export const Post: React.FC<PostProps> = ({
  title,
  createdAt,
  content,
  author,
}) => {
  const { email, name, image } = author;
  return (
    <div className="bg-gray-700 p-4 my-4 w-full flex text-gray-200 rounded-lg hover:shadow-2xl transition duration-500 ease-in-out">
      <div className="flex flex-col items-center p-2">
        <FaArrowUp />
        <span>8</span>
        <FaArrowDown />
      </div>
      <div className="flex flex-col justify-around items-start ml-4 w-full">
        <div className="flex items-center justify-center text-xs">
          <img
            src={image}
            height={40}
            width={40}
            className="rounded-full mr-2"
          />
          <span>
            {email} | {name}
          </span>
        </div>
        <h1 className="font-bold text-xl uppercase py-4">{title}</h1>
        <p className="pr-2 w-1/2 leading-loose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          deleniti facilis ex distinctio aut at magnam optio, inventore eaque
          asperiores reprehenderit explicabo harum sit nihil alias delectus
          adipisci! Autem, sapiente?
        </p>
        <div className="flex items-center justify-between py-4">
          <FaRocketchat /> <span className="text-gray-400 ml-2">1 comment</span>
        </div>
      </div>
    </div>
  );
};
