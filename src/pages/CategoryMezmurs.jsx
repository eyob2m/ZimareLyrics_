import NavBar from "../components/navBar";
import AddLyrics from "../components/AddLyrics";
import BottomBar from "../components/BottomBar";
import { RiMusicLine } from "react-icons/ri";
import React from 'react';
import { selectCategoryById, useGetCategorysQuery } from "../app/CategorySlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryMezmursCard from "../components/CategoryMezmursCard";
import { Helmet } from "react-helmet-async";

export default function CategoryMezmurs() {

  window.scrollTo(0,0);
  const { data, error, isLoading } = useGetCategorysQuery(undefined, {refetchOnMountOrArgChange: true});

  window.scrollTo(0,0);
const {id} = useParams()

const cat = useSelector(state=>selectCategoryById(state,id));
if(error) {
  return (<h1>Error: {error}</h1>)
}
if(isLoading) {
  return (<h1>Loading . . .</h1>)
}
if(data){
  return (
    <div className="flex flex-col bg-gray">
    <NavBar />


    <div className="md:p-10  md:py-12 py-10 w-full md:gap-8 justify-center items-center flex flex-col bg-gray">
    <Helmet>
        <title>{cat.name} Mezmurs Lyrics</title>
    <meta name="description" content={`${cat.name} Mezmurs Lyrics`}/>
  <meta name="keywords" content={`Mezmur,Lyrics,Ethiopia,Orthodox,Tewahdo,${cat.name}`}/>
        </Helmet>
        <div className="flex flex-col text-white gap-2 items-center ">
           
            <h2 className="font-bold text-5xl">{cat.name}</h2>
          <div className="flex fgap-2"> <RiMusicLine /> <h3 className="text-3xl mb-4">{cat.mezmurs.length}{cat.mezmurs.length>1? " መዝሙሮች":" መዝሙር"}</h3>
          </div>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-2 px-8   my-10 gap-2 md:gap-6">
       <CategoryMezmursCard cat={cat}/>
      </div>
    </div>
    <AddLyrics />
    <BottomBar />
  </div>
  )}
}
