import axios from "axios";
import { signIn, useSession } from "next-auth/client";
import React from "react";
import { Post } from "../components/Post";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const queryParams = context.query;
  const { id } = queryParams;
  try {
    const res = await axios.post("http://localhost:3000/api/posts/single", {
      data: { id },
    });
    const post = res.data;
    return { props: { post } };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
};

const PostDetails = ({ post }) => {
  const { title, content, createdAt, author } = post;
  const [session, loading] = useSession();
  return (
    <div className=" bg-gray-800">
      <div className="flex flex-col m-auto w-4/5">
        <Post
          title={title}
          content={content}
          createdAt={createdAt}
          author={author}
        />
        {!session && (
          <div className="flex text-gray-300 justify-between items-center border-2 border-gray-500 p-4">
            <h1 className="text-2xl">Login to leave a comment!</h1>
            <div>
              <button
                onClick={() => signIn()}
                className="px-4 py-2 bg-gray-700 rounded m-2"
              >
                Login
              </button>
              <button className="px-4 py-2 bg-gray-700 rounded m-2">
                <Link href="/">
                  <a>Go Back</a>
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
