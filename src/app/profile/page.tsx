"use client";
import {
  PromptCardList,
  PromptDoc,
  getTagsFromPromptDocList,
} from "@/components/Feed";
import SVGBackground from "@/components/SVGBackground";
import useCurrentUser from "@/hooks/useCurrentUser";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const Profile = () => {
  const { loading, startLoading, user, stopLoading } = useCurrentUser();
  // redirectUnauthenticatedUsersClient();
  const [posts, setPosts] = useState<PromptDoc[]>([]);
  const [originalPosts, setOriginalPosts] = useState<PromptDoc[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function getPromptsOfUser() {
      if (!user) return;
      // startLoading();

      const res = await fetch(`/api/users/${user.id}/posts`, {
        cache: "no-cache",
      });
      const data = await res.json();

      setPosts(data);
      setOriginalPosts(data);

      // stopLoading();
    }

    getPromptsOfUser();
  }, [user]);

  const handleEdit = async ({
    postId,
    prompt,
    tags,
  }: {
    postId: string;
    prompt: string;
    tags: string[];
  }) => {
    router.push(`/update-prompt/${postId}`);
    // const res = await fetch(`/api/prompt/${postId}`, {
    //   method: "PATCH",
    //   body: JSON.stringify({ prompt, tags, userId: user?.id }),
    // });

    // if (!res.ok) {
    //   throw new Error("Error updating prompt. Do you own this post?");
    // }
  };

  const handleDelete = async ({ postId }: { postId: string }) => {
    const b = confirm("Are you sure you want to delete this prompt?");
    if (!b) return;

    startLoading();
    const res = await fetch(`/api/prompt/${postId}`, {
      method: "DELETE",
      body: JSON.stringify({ userId: user?.id }),
    });
    setPosts(posts.filter((post) => post._id !== postId));
    stopLoading();
  };

  return (
    <SVGBackground>
      <div className="max-w-6xl mx-auto p-1 pt-48">
        {loading && <h1 className="text-4xl font-bold">Loading...</h1>}
        {!user && !loading && redirect("/")}
        <h1 className="blue-text-gradient text-4xl">Profile</h1>
        <PromptSearch originalPosts={originalPosts} setPosts={setPosts} />
        <PromptCardList
          data={posts}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </SVGBackground>
  );
};

interface PromptSearchProps {
  originalPosts: PromptDoc[];
  setPosts: React.Dispatch<React.SetStateAction<PromptDoc[]>>;
}

const PromptSearch = ({ originalPosts, setPosts }: PromptSearchProps) => {
  const allTags = getTagsFromPromptDocList(originalPosts);
  const tagOptionsList = allTags.map((tag) => ({ value: tag, label: tag }));
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  return (
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
  );
};

export default Profile;
