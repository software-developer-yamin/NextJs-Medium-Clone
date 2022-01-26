import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Post } from "../typings";

interface Inputs {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

const Comment = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((result) => {
        console.log(result);
        setSubmitted(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {submitted ? (
        <div className="flex flex-col p-10 mx-auto max-w-2xl my-10 bg-yellow-500 text-white" >
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment!
          </h3>
          <p>Onece it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 mb-10 max-w-2xl mx-auto"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this Article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="mt-2 py-3" />

          <input defaultValue={post._id} type="hidden" {...register("_id")} />
          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", { required: true })}
              className="formInput"
              type="text"
              placeholder="Enter your name"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email", { required: true })}
              className="formInput"
              type="text"
              placeholder="Enter your email"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              className="shadow border px-3 py-2 outline-none block mt- w-full ring-yellow-500 focus:ring rounded min-h-[150px]"
              placeholder="Comment...."
              rows={8}
            />
          </label>

          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500 font-semibold">
                - The Name Field is required
              </span>
            )}
            {errors.email && (
              <span className="text-red-500 font-semibold">
                - The Email Field is required
              </span>
            )}
            {errors.name && (
              <span className="text-red-500 font-semibold">
                - The Comment Field is required
              </span>
            )}
          </div>
          <input
            type="submit"
            className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </form>
      )}
    </div>
  );
};

export default Comment;
