"use client";
import { Post } from "@/app/create-prompt/page";
import PromptForm, { PromptFormProps } from "@/components/PromptForm";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface EditPromptFormProps {
  id: string;
}

const EditPromptForm = ({ id }: EditPromptFormProps) => {
  const [post, setPost] = useState<Post>({ prompt: "", tags: [] });
  const [submitting, setSubmitting] = useState(false);
  const { user, loading, startLoading, stopLoading } = useCurrentUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const res = await fetch(`/api/prompt/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        prompt: post.prompt,
        tags: post.tags,
        userId: user?.id,
      }),
    });

    console.log("finished updating");

    if (!res.ok) {
      throw new Error("Error updating prompt. Do you own this post?");
    }
    router.push("/");
  };

  useEffect(() => {
    async function getPrompt() {
      const res = await fetch(`/api/prompt/${id}`, {
        cache: "no-cache",
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error("Error updating prompt. Do you own this post?");
      }
      setPost({ prompt: data.prompt, tags: data.tags });
    }
    getPrompt();
  }, [id]);

  if (loading) return <div className="text-4xl font-bold">Loading...</div>;

  return (
    <PromptForm
      type="Edit"
      handleSubmit={handleSubmit}
      post={post}
      setPost={setPost}
      submitting={submitting}
    />
  );
};

export default EditPromptForm;
