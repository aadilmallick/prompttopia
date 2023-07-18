import React from "react";

const SVGBackground = ({ children }: { children: React.ReactNode }) => {
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
      {children}
    </section>
  );
};

export default SVGBackground;
