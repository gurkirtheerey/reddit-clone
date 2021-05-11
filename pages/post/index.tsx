import { useSession } from "next-auth/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

type PropType = {
  title: string;
  content: string;
};

export const getServerSideProps = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/subthread/subthreads"
    );
    const subthreads = res.data;
    return { props: { subthreads } };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
};

const CreatePost = ({ subthreads }) => {
  const [session] = useSession();
  const [select, setSelect] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    if (subthreads && subthreads.length) {
      setSelect(subthreads[0].id);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(8, "8 characters are required").required(),
      content: Yup.string().min(15, "15 characters are required").required(),
    }),
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleSubmit = async (values: PropType) => {
    if (session && session.user) {
      const { email } = session.user;
      const { title, content } = values;
      const data = { email, title, content, published: false, select };
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
        className="bg-gray-900 flex flex-col h-1/2 w-full md:w-2/3 lg:w-2/3 justify-around items-center rounded-2xl shadow-2xl"
      >
        <h1 className="text-md font-bold leading-relaxed">Create Post</h1>
        <div className="w-4/5">
          <label className="text-xs mb-2">Select Subthread</label>
          <select
            className="bg-gray-800 w-full hover:bg-gray-700 transition duration-200 ease-in cursor-default focus:outline-none px-4 py-2 rounded-full"
            onChange={(e) => setSelect(e.target.value)}
          >
            {subthreads &&
              subthreads.length &&
              subthreads.map((subthread) => (
                <option key={subthread.id} value={subthread.id}>
                  {subthread.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col w-4/5 justify-center items-center">
          <div className="w-full">
            <label className="text-xs mb-2">Title</label>
            <input
              id="title"
              name="title"
              className="w-full px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition duration-200 ease-in cursor-default focus:outline-none"
              type="text"
              placeholder="Title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
          </div>
          {formik.touched.title && formik.errors.title ? (
            <span className="text-red-600 font-bold mt-2 text-xs w-full">
              {formik.errors.title}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col w-4/5 justify-center items-center">
          <div className="w-full">
            <label className="text-xs mb-2">Description</label>
            <textarea
              id="content"
              name="content"
              className="w-full px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition duration-200 ease-in cursor-default focus:outline-none"
              placeholder="Some value..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
            />
          </div>
          {formik.touched.content && formik.errors.content ? (
            <span className="text-red-600 font-bold mt-1 text-xs w-full">
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
