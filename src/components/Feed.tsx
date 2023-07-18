"use client";

import { Post } from "@/app/create-prompt/page";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { GradientOutlineButton } from "./Buttons";

export interface PromptDoc {
  prompt: string;
  tags: string[];
  _id: string;
  creator: {
    email: string;
    image: string;
  };
}

const Feed = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<PromptDoc[]>([]); // [Post

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt/all", {
        next: {
          revalidate: 10,
        },
      });
      const data = await res.json();
      console.log(data);
      setPosts(data.prompts);
    };
    fetchPosts();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTagClick = (tag: string) => {};

  console.log(search);

  return (
    <div className="w-full">
      <form className="max-w-xl mx-auto bg-white p-4">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={"brh"}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
      </form>
      <PromptCardList data={posts} />
    </div>
  );
};

type HandleEdit = ({
  postId,
  prompt,
  tags,
}: {
  postId: string;
  prompt: string;
  tags: string[];
}) => void;
type HandleDelete = ({ postId }: { postId: string }) => void;

export function PromptCardList({
  data,
  handleEdit,
  handleDelete,
}: {
  data: PromptDoc[];
  handleEdit?: HandleEdit;
  handleDelete?: HandleDelete;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((prompt) => (
        <div
          key={prompt._id}
          className="glassmorphism p-2 display flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <Image
                src={prompt.creator.image}
                width={40}
                height={40}
                className="rounded-full"
                alt="profile picture"
              />
              <h3>{prompt.creator.email}</h3>
            </div>
            <p>{prompt.prompt}</p>
          </div>
          <div className="">
            <div className="flex flex-wrap space-x-2 text-gray-400 text-sm font-semibold py-2">
              {prompt.tags.join(" ")}
            </div>
            <div className="flex py-2 space-x-2">
              <GradientOutlineButton
                onClick={() => navigator.clipboard.writeText(prompt.prompt)}
              >
                Copy
              </GradientOutlineButton>
              {handleEdit && (
                <GradientOutlineButton
                  onClick={() =>
                    handleEdit({
                      postId: prompt._id,
                      prompt: prompt.prompt,
                      tags: prompt.tags,
                    })
                  }
                >
                  Edit
                </GradientOutlineButton>
              )}
              {handleDelete && (
                <GradientOutlineButton
                  onClick={() => handleDelete({ postId: prompt._id })}
                >
                  Delete
                </GradientOutlineButton>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
