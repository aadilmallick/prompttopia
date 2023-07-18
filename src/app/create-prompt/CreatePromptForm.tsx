"use client";
import PromptForm from "@/components/PromptForm";
import { useState } from "react";
import { Post } from "./page";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface Payload {
  prompt: string;
  tags: string[];
  email: string;
}

export default function CreatePromptForm() {
  const [post, setPost] = useState<Post>({ prompt: "", tags: [] });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const session = await getSession();
    const email = session?.user?.email;
    const res = await fetch("/api/prompt/new", {
      method: "POST",
      body: JSON.stringify({ ...post, email }),
    });
    setPost({ prompt: "", tags: [] });
    setSubmitting(false);
    router.push("/");
  };

  return (
    <PromptForm
      post={post}
      setPost={setPost}
      submitting={submitting}
      type="Create"
      handleSubmit={handleSubmit}
    ></PromptForm>
  );
}
