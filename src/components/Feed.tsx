"use client";

import { Post } from "@/app/create-prompt/page";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { GradientOutlineButton } from "./Buttons";
import Select from "react-select";
import { toast } from "react-toastify";

const selectOptions: { value: string; label: string }[] = [];

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
  const [tagOptionsList, setTagOptionsList] = useState<typeof selectOptions>(
    []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [originalPosts, setOriginalPosts] = useState<PromptDoc[]>([]); // [Post
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("/api/prompt/all", {
        next: {
          revalidate: 60,
        },
      });
      const data = await res.json();

      setPosts(data.prompts);
      setOriginalPosts(data.prompts);
      const fetchedPosts = data.prompts as PromptDoc[];
      const allTags = getTagsFromPromptDocList(fetchedPosts);
      setTagOptionsList(allTags.map((tag) => ({ value: tag, label: tag })));
    };
    fetchPosts().then(() => setLoading(false));
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTagClick = (tag: string) => {};

  return (
    <div className="w-full">
      <div className="max-w-xl mx-auto p-4 relative z-10">
        <Select
          options={tagOptionsList}
          onChange={(newvalue) => {
            const tagList = newvalue.map((tag) => tag.value);
            setSelectedTags(tagList);

            if (tagList.length === 0) {
              setPosts(originalPosts);
              return;
            }
            setPosts(
              originalPosts.filter((post) => {
                return tagList.some((tag) => post.tags.includes(tag));
              })
            );
          }}
          isMulti
          isSearchable
          noOptionsMessage={() => "Loading tags..."}
        />
      </div>
      {loading && (
        <h1 className={"blue-text-gradient text-2xl font-bold"}>
          Your feed is loading
        </h1>
      )}
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
  if (!data) return <div className="text-4xl font-bold">No data...</div>;
  return (
    <div className="grid grid-cols-3 gap-8">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}

const PromptCard = ({
  prompt,
  handleDelete,
  handleEdit,
}: {
  prompt: PromptDoc;
  handleEdit?: HandleEdit;
  handleDelete?: HandleDelete;
}) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="glassmorphism p-2 display flex flex-col justify-between">
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
        <p className={`${readMore ? "" : "line-clamp-3"}`}>{prompt.prompt}</p>
        <p
          className="text-orange-400 text-sm font-bold hover:text-orange-600 transition-colors cursor-pointer"
          onClick={() => {
            setReadMore(!readMore);
          }}
        >
          read {readMore ? "less" : "more"}
        </p>
      </div>
      <div className="">
        <div className="flex flex-wrap space-x-2 text-gray-400 text-sm font-semibold py-2">
          {prompt.tags.join(" ")}
        </div>
        <div className="flex py-2 space-x-2">
          <GradientOutlineButton
            onClick={() => {
              navigator.clipboard.writeText(prompt.prompt);
              toast.success("Copied to clipboard!", {
                autoClose: 500,
              });
            }}
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
  );
};

export function getTagsFromPromptDocList(posts: PromptDoc[]) {
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  return Array.from(tags);
}

export default Feed;
