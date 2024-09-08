import { Link } from "react-router-dom";
import kebero from "../assets/kebero.png";
import { selectAllMezmur, useGetMezmursQuery } from "../app/MezmurSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from 'react';
export default function NavBar() {
  const [search, setsearch] = useState("");
  useGetMezmursQuery(undefined, {refetchOnMountOrArgChange: true});
  const mez = useSelector(selectAllMezmur);

  return (
    <div className="w-[100vw] md:mb-20 mb-10 border-b-2 border-gray font-serif flex flex-col items-center justify-center max-w-[1800px]">
      <div className="md:px-20 px-4 py-3 md:py-4 w-full items-center flex justify-between bg-graymiddle">
        <Link to={"/"}>
          <div className="flex items-center gap-2 ">
            <img src={kebero} alt="kebero" width={"18px"} />
            <h1 className="font-bold text-white  md:text-3xl">Zimare Lyrics</h1>
          </div>
        </Link>
        <div className="relative flex md:w-[50%] md:justify-end justify-center">
          <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
            placeholder="Search Here . . ."
            className="placeholder:truncate active:outline-none  placeholder:text-ellipsis active:border-none hover:outline-none hover:border-none border:none text-white placeholder:text-white bg-gray bg-opacity-80  p-2 rounded-md  md:w-[30%]"
            type="text"
          />
          <div className="absolute md:w-[30%] bg-gray w-full top-20 bottom-0">
            {mez.map((m) => {
              let splitLy = m.lyrics.split(/[\s\n]+/);

              if (
                m.title.trim().startsWith(search) ||
                splitLy.some((word) => word.startsWith(search))
              ) {
                if (search != "") {
                  {
                    return (
                      <Link
                        onClick={() => setsearch("")}
                        to={`/lyrics/${m._id}`}
                        key={m.title}
                      >
                        <div className="hover:bg-graymiddle duration-300 flex mt-1 text-white px-2 flex-col bg-gray items-start">
                          {" "}
                          <h1 className=" text-xl">{m.title}</h1>
                          <h2 className=" text-xs">{m.zemari.name}</h2>
                        </div>
                      </Link>
                    );
                  }
                }
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
