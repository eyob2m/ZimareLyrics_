/* eslint-disable no-unused-vars */
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import NavBar from "../components/navBar";
import RelatedListCard from "../components/RelatedListCard";
import BottomBar from "../components/BottomBar";
import AddLyrics from "../components/AddLyrics";
import { useParams } from "react-router-dom";
import { selectMezmurById, useGetMezmursQuery } from "../app/MezmurSlice";
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet-async";
import React from 'react';
export default function ShowLyrics() {
  
  const { data, error, isLoading } = useGetMezmursQuery(undefined, {refetchOnMountOrArgChange: true});
  const { id } = useParams();
  
  
  const mez = useSelector(state => selectMezmurById(state, id));

  
  window.scrollTo(0, 0);

  if (error) {
    return (<h1>Error: {error}</h1>);
  }
  
  if (isLoading) {
    return (<h1>Loading . . .</h1>);
  }

  
  if (!mez) {
    return (<h1>Loading data...</h1>); 
  }

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="w-full font-serif flex flex-col pb-8 items-center justify-center max-w-[1800px]">
        <Helmet>
          <title>{mez.title} Mezmur by {mez.zemari.name} Lyrics</title>
          <meta name="description" content={`${mez.title} Mezmur by ${mez.zemari.name} Lyrics`} />
          <meta name="keywords" content={`Mezmur, Lyrics, Ethiopia, Orthodox, Tewahdo, ${mez.title}, ${mez.zemari.name}`} />
        </Helmet>
        <div className="flex text-white border-2 border-gray rounded-xl py-20 w-full max-w-[800px] flex-col items-center justify-center bg-gray-800 p-4">
          <div className="flex gap-2 items-center">
            <FaQuoteLeft />
            <h2 className="font-bold text-5xl max-w-[90%]">{mez.title}</h2>
            <FaQuoteRight />
          </div>
          <h3 className="text-3xl mb-4 max-w-[90%]">{mez.zemari.name}</h3>
          <div className="overflow-x-auto">
            <pre className="whitespace-pre-wrap text-2xl max-w-[100%]">{mez.lyrics}</pre>
          </div>
        </div>
      </div>
      <div className="md:p-10 md:py-12 py-10 w-full md:gap-8 justify-center items-center flex flex-col bg-gray">
        <h2 className="text-white text-4xl md:text-3xl font-semibold">Related Mezmurs</h2>
        <div className="grid lg:grid-cols-4 grid-cols-2 my-10 gap-2 md:gap-5 w-[90%]">
          <RelatedListCard id={mez._id} />
        </div>
      </div>
      <AddLyrics />
      <BottomBar />
    </div>
  );
}
