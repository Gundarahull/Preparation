import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Post = () => {
  const { handleSubmit, register } = useForm();

  useEffect(() => {});
  const onSubmitFun = (data) => {
    const postingData = async (data) => {
      try {
        const response = await axios.post(
          "something.api",
          {
            name: "rahul",
            email: "a@abc.com",
          },
          { headers: { Authorization: "Bearer Token" } },
        );
      } catch (error) {}
    };
    postingData(data);
  };
  return (
    <>
      <div>Post</div>
      <form onSubmit={handleSubmit(onSubmitFun)}>
        <input {...register("name", { required: "Name is Mandatory" })} />
        <input
          {...register("email", { required: "Email is Mandatory" })}
          type="email"
          placeholder="Enter email"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Post;
