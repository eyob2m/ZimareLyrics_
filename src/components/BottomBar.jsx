import kebero from "../assets/kebero.png";
import React from 'react';
export default function BottomBar() {
  return (
    <div className="md:px-20 px-4 py-3 md:py-4 w-full items-center flex justify-between bg-graymiddle">
    <div className="flex items-center gap-2 ">
      <img src={kebero} alt="kebero" width={"18px"} />
      <h1 className="font-bold text-white  md:text-xl">Zimare Lyrics</h1>
    </div>
    <h1 className="text-white text-md">@eyob2m</h1>
  </div>
  )
}
