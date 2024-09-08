import NavBar from "../components/navBar";
import AddLyrics from "../components/AddLyrics";
import BottomBar from "../components/BottomBar";
import CategoryListCard from "../components/CategoryListCard";
import { Helmet } from "react-helmet-async";
import React from 'react';
export default function ZemariList() {
  window.scrollTo(0,0);
  return (
    <div className="flex flex-col bg-gray">
    <NavBar />


    <div className="md:p-10  md:py-12 py-10 w-full md:gap-8 justify-center items-center flex flex-col bg-gray">
    <Helmet>
        <title>Zemari List</title>
    <meta name="description" content={`all zemaris list`}/>
  <meta name="keywords" content={`Mezmur,Lyrics,Ethiopia,Orthodox,Tewahdo,Zemari`}/>
        </Helmet>
      <h2 className="text-white text-4xl md:text-3xl font-semibold">
       Zemari List
      </h2>
      <div className="grid lg:grid-cols-4 grid-cols-2  my-10 gap-2 md:gap-5 w-[80%]">
        <CategoryListCard type={"zemari"}/>
      </div>
    </div>
    <AddLyrics />
    <BottomBar />
  </div>
  )
}
