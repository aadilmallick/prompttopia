import PromptForm from "@/components/PromptForm";
import SVGBackground from "@/components/SVGBackground";
import React from "react";
import CreatePromptForm from "./CreatePromptForm";
import { redirectUnauthenticatedUsersServer } from "@/lib/auth";

const CreatePrompt = async () => {
  await redirectUnauthenticatedUsersServer();
  return (
    <SVGBackground>
      <section className="pt-24">
        <div className="container">
          <h1 className="text-5xl font-black blue-text-gradient">
            Create Post
          </h1>
          <CreatePromptForm></CreatePromptForm>
        </div>
      </section>
    </SVGBackground>
  );
};

export interface Post {
  prompt: string;
  tags: string[];
}

export default CreatePrompt;
