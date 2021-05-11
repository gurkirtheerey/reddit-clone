import React from "react";
import { PostProps } from "../../types/PostProps";
import { FaArrowUp, FaArrowDown, FaRocketchat } from "react-icons/fa";
import Link from "next/link";

export const Post: React.FC<PostProps> = ({
  title,
  content,
  author,
  id,
  comments,
  uplikePost,
  downlikePost,
  upLikesFrom,
  downLikesFrom,
  userId,
}) => {
  const { email, name, image } = author;
  return (
    <div className="bg-gray-700 p-1 my-1 md:p-4 lg:p-4 md:my-4 lg:my=4 w-full md:w-4/5 lg:w-4/5 flex text-gray-200 md:rounded-lg lg:rounded-lg hover:shadow-2xl transition duration-500 ease-in-out">
      <div className="flex flex-col items-center justify-evenly p-2 h-24">
        <FaArrowUp
          className="cursor-pointer"
          size={24}
          color={`${
            upLikesFrom &&
            upLikesFrom.length &&
            upLikesFrom.find((p) => p === userId)
              ? "red"
              : "white"
          }`}
          onClick={uplikePost}
        />
        <span className="text-md font-bold">
          {upLikesFrom?.length - downLikesFrom?.length || 0}
        </span>
        <FaArrowDown
          className="cursor-pointer"
          size={24}
          onClick={downlikePost}
          color={`${
            downLikesFrom &&
            downLikesFrom.length &&
            downLikesFrom.find((p) => p === userId)
              ? "red"
              : "white"
          }`}
        />
      </div>
      <div className="flex flex-col justify-around items-start md:ml-4 lg:ml-4 w-full">
        <div className="flex items-center justify-center text-xs">
          <img
            src={image}
            height={40}
            width={40}
            className="rounded-full mr-1 my-2 md:mr-2 lg:mr-2"
          />
          <span className="truncate">
            {email} | {name}
          </span>
        </div>
        <h1 className="font-bold text-md md:text-xl lg:text-xl uppercase py-4">
          {title}
        </h1>
        <p className="pr-2 text-sm md:w-1/2 lg:w-1/2 md:leading lg:leading-loose">
          {content}
        </p>
        <div className="flex items-center justify-between my-4 p-2 hover:bg-gray-600 rounded-lg">
          <FaRocketchat />
          <Link href={`/post/${id}?userId=${userId}`}>
            <a className="text-gray-400 ml-2">
              {comments && comments.length ? comments.length : "0"} comments
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
