import Head from "next/head";
import axios from "axios";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { useWindowSize } from "../hooks/useWindowSize";
import { Navbar } from "../components/Navbar";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/posts/post");
  const retrievedPosts = res.data;
  if (!retrievedPosts) {
    return {
      notFound: true,
    };
  }
  return {
    props: { retrievedPosts },
  };
};

export default function Home({ retrievedPosts }) {
  const [toggle, setToggle] = useState(false);
  const [posts, setPosts] = useState(retrievedPosts);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("filter") || "asc"
      : "asc"
  );
  const [sortedPosts, setSortedPosts] = useState([]);
  const [session] = useSession();
  const width = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    switch (filter) {
      case "asc":
        setSortedPosts(() => posts.sort((a, b) => a.id - b.id));
      case "desc":
        setSortedPosts(() => posts.sort((a, b) => a.id - b.id));
    }
  }, [posts, filter]);

  useEffect(() => {
    (async () => {
      if (session && session.user) {
        const { email, image, name } = session.user;
        const res = await axios.post("api/auth/user", {
          data: { email, image, name },
        });
        if (res && res.data) {
          const { user } = res.data;
          if (user) {
            setUser(user);
          }
        }
      }
    })();
  }, [session]);

  const toggleOn = () => setToggle(true);
  const toggleOff = () => setToggle(false);

  const uplikePost = async (post) => {
    if (session && session.user) {
      const { email } = session.user;
      try {
        const res = await axios.post("http://localhost:3000/api/posts/like", {
          post,
          email,
        });
        if (res && res.data) {
          const post = res.data;
          let idx = posts.findIndex((p) => p.id === post.id);
          let p = posts.find((p) => p.id === post.id);
          let temp = [...posts];
          p.upLikesFrom = post.upLikesFrom;
          temp[idx] = p;
          setPosts(temp);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      router.push("/api/auth/signin");
    }
  };

  const downlikePost = async (post) => {
    console.log(post);
    post.likes = post.likes + 1;
    console.log(post);
  };

  const updateFilter = (value) => {
    setFilter(value);
    localStorage.setItem("filter", value);
  };

  return (
    <>
      <Head>
        <title>Postify | Reddit Clone</title>
      </Head>
      <Navbar
        toggle={toggle}
        toggleOff={toggleOff}
        toggleOn={toggleOn}
        width={width}
      />
      <div
        className="flex flex-col items-center justify-center bg-gray-900"
        onClick={toggle ? () => setToggle(false) : null}
      >
        <div className="w-4/5 flex justify-between items-end">
          <h1 className="w-4/5 text-2xl md:text-4xl lg:text-4xl font-bold py-6 text-white">
            Home
          </h1>
          <select
            value={filter}
            onChange={(e) => updateFilter(e.target.value)}
            className="h-1/2"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {sortedPosts && sortedPosts.length ? (
          sortedPosts.map((post, i) => (
            <React.Fragment key={post.id}>
              <Post
                userId={user && user.id}
                upLikesFrom={post.upLikesFrom}
                uplikePost={() => uplikePost(post)}
                downlikePost={() => downlikePost(post)}
                title={post.title}
                createdAt={post.createdAt}
                content={post.content}
                author={post.author}
                id={post.id}
                comments={post.comments}
              />
            </React.Fragment>
          ))
        ) : (
          <h1>Nothing.. it's empty</h1>
        )}
      </div>
    </>
  );
}
