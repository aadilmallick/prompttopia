import PromptForm from "@/components/PromptForm";
import SVGBackground from "@/components/SVGBackground";
import React from "react";
import { redirectUnauthenticatedUsersServer } from "@/lib/auth";
import EditPromptForm from "./EditPromptForm";

const UpdatePrompt = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  await redirectUnauthenticatedUsersServer();
  console.log(params.id);
  return (
    <SVGBackground>
      <section className="pt-24">
        <div className="container">
          <h1 className="text-5xl font-black blue-text-gradient">
            Update Post
          </h1>
          <EditPromptForm id={params.id} />
        </div>
      </section>
    </SVGBackground>
  );
};

export default UpdatePrompt;
