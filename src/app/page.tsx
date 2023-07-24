// export const revalidate = 0;
// import Feed from "@/components/Feed";
import Image from "next/image";
import { Suspense, lazy } from "react";

const Feed = lazy(() => import("@/components/Feed"));

export default function Home() {
  return (
    <section className="relative min-h-screen">
      <svg
        id="bg-pattern"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="a"
            patternUnits="userSpaceOnUse"
            width="40"
            height="40"
            patternTransform="scale(2) rotate(0)"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="hsla(0,0%,100%,1)"
            />
            <path
              d="M0 0h10v20H0zM30 0v10H10V0zM10 10h10v20H10zM40 10v10H20V10zM20 20h10v20H20zM50 20v10H30V20zM30 30h10v20H30zM20 30v10H0V30zM10 20v10h-20V20zM30-10h10v20H30z"
              strokeWidth="1"
              stroke="hsla(33, 90%, 65%, 1)"
              fill="none"
            />
          </pattern>
        </defs>
        <rect
          width="800%"
          height="800%"
          transform="translate(0,0)"
          fill="url(#a)"
        />
      </svg>
      {/* container */}
      <div className="max-w-6xl mx-auto py-20 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-black text-center max-w-lg">
          Discover & Share
          <br />
          <span className="orange-text-gradient">AI-Powered Prompts</span>
        </h1>
        <Suspense
          fallback={<div className="text-4xl font-bold">Loading feed...</div>}
        >
          <Feed />
        </Suspense>
      </div>
    </section>
  );
}
