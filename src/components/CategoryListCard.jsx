/* eslint-disable no-unused-vars */
import { RiMusic2Line } from "react-icons/ri";
import React from 'react';
import { TbCategoryFilled } from "react-icons/tb";
import { selectAllCategory, useGetCategorysQuery } from "../app/CategorySlice";
import { useSelector } from "react-redux";
import { selectAllZemari, useGetZemarisQuery } from "../app/ZemariSlice";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CategoryListCard({type}) {
  let toBoMap = []
  window.scrollTo(0,0);
  const { isLoading: isLoadingCat, isSuccess: isSuccessCat } =
  useGetCategorysQuery(undefined, {refetchOnMountOrArgChange: true});
const cat = useSelector(selectAllCategory);
const { isLoading: isLoadingZem, isSuccess: isSuccessZem } =
useGetZemarisQuery(undefined, {refetchOnMountOrArgChange: true});
const zem = useSelector(selectAllZemari);
if(type=="zemari"){toBoMap=zem}
if(type=="category"){toBoMap=cat}
  const Lists = toBoMap.map((m) => {
    return (
      <Link  key={m._id} to={`${type == "category" ? `/categorymezmur/${m._id}`:type=="zemari"? `/zemarimezmur/${m._id}`:`/lyrics/${m._id}`}`}>
      <div
       
        className="flex hover:-translate-y-2 border-graymiddle  border-2 hover:border-white duration-300 cursor-pointer flex-col bg-graymiddle px-6 py-2 md:p-8 md:px-10 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <TbCategoryFilled className="text-white" />
          <h3 className="md:text-2xl text-white"> {m.name} </h3>
        </div>
        <div className="flex items-center text-3xl gap-3">
          <RiMusic2Line className="text-white" />
          <h3 className="md:text-xl text-white"> {m.mezmurs.length}{ m.mezmurs.length>1? " መዝሙሮች":" መዝሙር"}</h3>
        </div>
        
      </div></Link>
    );
  });
  return <>{Lists}</>;
}
