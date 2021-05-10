import Head from "next/head";
import axios from "axios";
import { signIn, useSession } from "next-auth/client";
import React, { useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Post } from "../components/Post";
import Link from "next/link";

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/posts/post");
  const posts = res.data;
  if (!posts) {
    return {
      notFound: true,
    };
  }
  return {
    props: { posts },
  };
};

export default function Home({ posts }) {
  const [session, loading] = useSession();

  useEffect(() => {
    (async () => {
      if (session && session.user) {
        const { email, image, name } = session.user;
        const res = await axios.post("api/auth/user", {
          data: { email, image, name },
        });
      }
    })();
  }, [session]);

  return (
    <>
      <Head>
        <title>Postify | Reddit Clone</title>
      </Head>
      <Navigation />
      <div className="flex flex-col items-center justify-center bg-gray-800">
        <h1 className="w-4/5 text-4xl font-bold py-6 text-white">Home</h1>
        {posts && posts.length ? (
          posts.map((post, i) => (
            <Link href={`/${post.id}`} key={post.id}>
              <a className="flex justify-center w-3/5 hover:cursor-default">
                <Post
                  title={post.title}
                  createdAt={post.createdAt}
                  content={post.content}
                  author={post.author}
                />
              </a>
            </Link>
          ))
        ) : (
          <h1>Nothing.. it's empty</h1>
        )}
      </div>
    </>
  );
}
