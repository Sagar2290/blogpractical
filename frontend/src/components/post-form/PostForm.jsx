/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../index";
import postService from "../../services/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      description: post?.description || "",
      category: post?.category || "active",
    },
  });

  const userToken = useSelector((state) => state.auth.userData.token);

  const navigate = useNavigate();

  const submit = async (data) => {
    if (post) {
      const dbPost = await postService.updatePost(
        post._id,
        {
          ...data,
        },
        userToken
      );

      if (dbPost) {
        navigate(`/post/${dbPost.data.post._id}`);
      }
    } else {
      const dbPost = await postService.createPost(
        {
          ...data,
        },
        userToken
      );

      if (dbPost) {
        navigate(`/post/${dbPost.data.post._id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <Input
          label="Description :"
          placeholder="Description"
          className="mb-4"
          {...register("description", { required: true })}
        />

        <Input
          label="Category :"
          placeholder="Category"
          className="mb-4"
          {...register("category", { required: true })}
        />
      </div>
      <div className="w-1/3 px-2">
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
