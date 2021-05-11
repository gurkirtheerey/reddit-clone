import { useSession } from "next-auth/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

type PropType = {
  title: string;
  content: string;
};

const CreatePost = () => {
  const [session] = useSession();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(8, "8 characters are required").required(),
      content: Yup.string().min(15, "10 characters are required").required(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: PropType) => {
    if (session && session.user) {
      const { email } = session.user;
      const { title, content } = values;
      const data = { email, title, content, published: false };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/posts/create",
          { data }
        );
        if (response) {
          router.push("/");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Error submitting form....");
    }
  };

  return (
    <div className="h-screen bg-gray-800 text-white grid place-items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-gray-900 flex flex-col h-1/2 w-1/2 justify-around items-center"
      >
        <h1>Create Post</h1>
        <div className="flex flex-col w-full items-center">
          <input
            id="title"
            name="title"
            className="w-4/5 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition duration-200 ease-in cursor-default focus:outline-none"
            type="text"
            placeholder="Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <span className="text-red-600 font-bold mt-1 text-xs">
              {formik.errors.title}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col w-full items-center">
          <textarea
            id="content"
            name="content"
            className="w-4/5 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition duration-200 ease-in cursor-default focus:outline-none"
            placeholder="Some value..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content ? (
            <span className="text-red-600 font-bold mt-1 text-xs">
              {formik.errors.content}
            </span>
          ) : null}
        </div>

        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="w-1/2 bg-blue-800 hover:bg-blue-900 py-2 rounded disabled:cursor-not-allowed transition duration-200 ease-in focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
