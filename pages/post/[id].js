import axios from "axios";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import { Post } from "../../components/Post";
import { Comment } from "../../components/Comment";
import { SigninMessage } from "../../components/SigninMessage";
import { CommentForm } from "../../components/CommentForm";
import { Navbar } from "../../components/Navbar";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const queryParams = context.query;
  const { id, userId } = queryParams;

  try {
    const res = await axios.post("http://localhost:3000/api/posts/single", {
      data: { id },
    });
    const post = res.data;
    return { props: { post, userId } };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
};

const PostDetails = ({ post, userId }) => {
  const { title, content, createdAt, author, comments } = post;
  const [toggle, setToggle] = useState(false);
  const [target, setTarget] = useState(post);
  const [session] = useSession();
  const width = useWindowSize();
  const router = useRouter();
  const toggleOn = () => setToggle(true);
  const toggleOff = () => setToggle(false);

  userId = parseInt(userId);

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
          setTarget(post);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      router.push("/api/auth/signin");
    }
  };
  const downlikePost = async (post) => {
    if (session && session.user) {
      const { email } = session.user;
      try {
        const res = await axios.post(
          "http://localhost:3000/api/posts/dislike",
          {
            post,
            email,
          }
        );
        if (res && res.data) {
          const post = res.data;
          setTarget(post);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      router.push("/api/auth/signin");
    }
  };

  return (
    <>
      <div className="h-24 bg-gray-900">
        <Navbar
          toggle={toggle}
          toggleOff={toggleOff}
          toggleOn={toggleOn}
          width={width}
        />
      </div>
      <div
        className={`bg-gray-900 min-h-screen`}
        onClick={toggle ? () => setToggle(false) : null}
      >
        <div className={`flex flex-col `}>
          <div className="flex justify-center items-center">
            <Post
              userId={userId}
              upLikesFrom={target.upLikesFrom}
              downLikesFrom={target.downLikesFrom}
              uplikePost={() => uplikePost(target)}
              downlikePost={() => downlikePost(target)}
              title={title}
              createdAt={createdAt}
              content={content}
              author={author}
              comments={comments}
            />
          </div>

          {!session ? <SigninMessage /> : <CommentForm />}

          <div className="w-full md:w-4/5 lg:w-4/5 m-auto">
            {comments &&
              comments.length &&
              comments.map((comment, i) => (
                <React.Fragment key={comment?.id || i}>
                  <Comment comment={comment.comment} author={comment.author} />
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
