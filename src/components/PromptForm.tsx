"use client";
import { Post } from "@/app/create-prompt/page";
import React from "react";
import { GradientOutlineButton } from "./Buttons";

export interface PromptFormProps {
  type: string;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const PromptForm = ({
  type,
  handleSubmit,
  post,
  setPost,
  submitting,
}: PromptFormProps) => {
  console.log(post);

  const [curString, setCurString] = React.useState(post.tags.join(",") || "");
  return (
    <form
      onSubmit={handleSubmit}
      className="glassmorphism mt-12 max-w-2xl flex flex-col space-y-2 items-start"
    >
      <label htmlFor="prompt">Your AI Prompt</label>
      <textarea
        name="prompt"
        id="prompt"
        className="h-64 rounded-lg w-96 p-1"
        value={post.prompt}
        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
      ></textarea>
      <label htmlFor="tags">Your tags</label>
      <input
        type="text"
        name="tags"
        id=""
        className="rounded p-1"
        value={curString}
        onChange={(e) => {
          setCurString(e.target.value);
          setPost({
            ...post,
            tags: e.target.value
              .split(",")
              .filter((x) => x.trim().startsWith("#")),
          });
        }}
      />
      {!submitting ? (
        <GradientOutlineButton>Submit</GradientOutlineButton>
      ) : (
        <h1 className="text-xl font-bold">Loading..</h1>
      )}
    </form>
  );
};

const convertTagsToString = (tags: string[]) => {
  return tags.join(",");
};

export default PromptForm;
