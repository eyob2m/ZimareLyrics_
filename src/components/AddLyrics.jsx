import React from "react";
import { RiAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function AddLyrics() {
  return (
    <div className="p-10 md:py-32 py-10 w-full gap-8 justify-center items-center flex flex-col bg-gray">
    <h2 className="text-white text-3xl">
      Submit your favorite Mezmur lyrics
    </h2>
    <Link to={"/form"}><div className="cursor-pointer px-20 bg-white bg-opacity-90 hover:bg-opacity-50 duration-300 p-2 rounded-md flex gap-2 text-xl justify-center items-center ">
      Add <RiAddLine />
    </div></Link>
  </div>
  )
}
