import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-between items-center py-10 shadow-2xl rounded-2xl overflow-hidden lg:py-0 bg-yellow-400 border-y border-black" >
      <div className="px-10 space-y-5">
        <h1 className="text-6xl font-serif max-w-xl">
          <span className="underline decoration-black decoration-4">
            Medium
          </span>{" "}
          is a place to write, read and comment
        </h1>
        <h2>
          It's easy and free to post your thinking on any topic and contact with
          millions of readers
        </h2>
      </div>
      <img
        className="hidden md:inline-flex h-44 lg:h-full"
        src="https://seeklogo.com/images/M/medium-logo-93CDCF6451-seeklogo.com.png"
        alt=""
      />
    </div>
  );
};

export default Banner;
