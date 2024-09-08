import kebero from "../assets/kebero.png";
import React from 'react';
import loading from '../assets/loading.gif'
import RecentlyAddedCard from "./../components/RecentlyAddedCard";
import ListsCard from "./../components/ListsCard";
import AddLyrics from "../components/AddLyrics";
import BottomBar from "../components/BottomBar";
import { selectAllMezmur, useGetMezmursQuery } from "../app/MezmurSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  window.scrollTo(0, 0);
  const [search, setsearch] = useState("");
  const { isError, isLoading, isSuccess} = useGetMezmursQuery(undefined, {refetchOnMountOrArgChange: true});
  const mez = useSelector(selectAllMezmur);

  if (isError) {
    return  <div className="w-[100vw] font-serif h-[100vh] flex flex-col items-center justify-center max-w-[1800px]">
    <div className="p-10  md:py-32 py-20 w-full gap-8 h-full justify-center items-center flex flex-col bg-graymiddle">
      <div className="flex gap-5 items-center justify-center">

      <h1 className="text-white text-xl">Something goes wrong</h1>  
      </div>
  </div>  </div>  
  }
  if (isLoading) {
    return  <div className="w-[100vw] font-serif h-[100vh] flex flex-col items-center justify-center max-w-[1800px]">
    <div className="p-10  md:py-32 py-20 w-full gap-8 h-full justify-center items-center flex flex-col bg-graymiddle">
      <div className="flex gap-5 items-center justify-center">
<img src={loading} width={"25px"}  alt="loading" />
      <h1 className="text-white text-xl">Loading . . .</h1>  
      </div>
  </div>  </div>  
  }
  if (isSuccess) {
    return (
      <div className="w-[100vw] font-serif flex flex-col items-center justify-center max-w-[1800px]">
        <Helmet>
          <meta name="keywords" content="ethiopian, orthodox, mezmur,chant,hyme,song,lyrics,zimare,gitim,zemari,ኦርቶዶክስ,መዝሙር,ግጥም,ዝማሬ,ኢየሱስ,እግዚአብሄር,ማርያም,ዮሴፍ"/>
        <title>Zimare Lyrics - ዝማሬ ግጥም</title>
    <meta name="description" content="Here you can find Ethiopian Orthodox Tewahdo Mezmurs lyrics here and you can support up by submitting lyrics"/>
  
        </Helmet>
        <div className="p-10  md:py-32 py-20 w-full gap-8 justify-center items-center flex flex-col bg-graymiddle">
          <div className="flex items-center gap-5 ">
            <img src={kebero} alt="kebero" className="md:w-[150px]" width={"80px"} />
            <h1 className="font-bold text-white text-5xl md:text-8xl">
              Zimare Lyrics
            </h1>
          </div>
          <h2 className="text-white text-3xl">
            Explore a vast collection of Ethiopian ortodox mezmur lyrics
          </h2>
          <div className="relative flex justify-center w-full">
            <input
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              placeholder="Search by Mezmur Title or Lyrics . . ."
              className="mt-7 placeholder:truncate active:outline-none placeholder:text-ellipsis active:border-none hover:outline-none hover:border-none border:none text-white placeholder:text-white bg-gray bg-opacity-80  p-3 rounded-md w-[100%] lg:w-[30%]  md:w-[50%]"
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
                      return  <Link onClick={()=>setsearch("")} to={`/lyrics/${m._id}`} key={m.title}> 
                 <div className="hover:bg-graymiddle duration-300 flex mt-1 text-white px-2 flex-col bg-gray items-start"> <h1 className=" text-xl">{m.title}</h1><h2 className=" text-xs">{m.zemari.name}</h2></div></Link>
                    }
                  }
                }
              })}
            </div>
          </div>
        </div>

        <div className="md:p-10 md:py-32 py-10 w-full md:gap-8 justify-center items-center flex flex-col bg-gray">
          <h2 className="text-white text-4xl md:text-5xl font-semibold">
            Recently Added
          </h2>
          <div className="grid lg:grid-cols-4 grid-cols-2 px-6   my-10 gap-2 md:gap-6">
            <RecentlyAddedCard />
          </div>
        </div>

        <div className="lg:p-24  lg:gap-8  md:justify-evenly  flex lg:flex-row flex-col items-center lg:items-start w-full  bg-graymiddle">
          <ListsCard title="Title" />
          <ListsCard title="Zemari" />
          <ListsCard title="Category" />
        </div>
        
        <AddLyrics />
        <BottomBar />
      </div>
    );
  }
}
