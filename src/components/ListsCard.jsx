/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RiArrowRightLine } from "react-icons/ri";
import { selectAllCategory, useGetCategorysQuery } from "../app/CategorySlice";
import { useSelector } from "react-redux";
import { selectAllZemari, useGetZemarisQuery } from "../app/ZemariSlice";
import { selectAllMezmur, useGetMezmursQuery } from "../app/MezmurSlice";
import { Link } from "react-router-dom";
import React from 'react';
export default function ListsCard({ title }) {
  const { isLoading: isLoadingCat, isSuccess: isSuccessCat } =
    useGetCategorysQuery(undefined, {refetchOnMountOrArgChange: true});
  const cat = useSelector(selectAllCategory);
  const { isLoading: isLoadingMez, isSuccess: isSuccessMez } =
    useGetMezmursQuery(undefined, {refetchOnMountOrArgChange: true});
  const mez = useSelector(selectAllMezmur);
  const { isLoading: isLoadingZem, isSuccess: isSuccessZem } =
    useGetZemarisQuery(undefined, {refetchOnMountOrArgChange: true});
  const zem = useSelector(selectAllZemari);

  let me = [];
  if (title == "Title") {
    const mezsort = mez.sort((a, b) => a.title.localeCompare(b.title));
   
    me = mezsort;
  } else if (title == "Zemari") {
    me = zem;
  } else if (title == "Category") {
    me = cat;
  }
  const Lists = me.map((m, index) => {
    if (index < 8) {
      return (
       <Link key={m._id} to={`${me == cat ? `/categorymezmur/${m._id}`:me == zem ? `/zemarimezmur/${m._id}`:`/lyrics/${m._id}`}`} >
        <li
          
          className="mb-2 hover:translate-x-2 cursor-pointer duration-300 text-white "
        >
          <div className="flex flex-col">
            <h1 className="text-2xl">
              {me == mez && m.title}
              {me == zem && m.name}
              {me == cat && m.name}
            </h1>
            <h4 className="text-md">
              {me == mez && m.zemari.name}
              {me == zem && m.mezmurs.length} {me == zem ? m.mezmurs.length>1? " መዝሙሮች":" መዝሙር":""}
              {me == cat && m.mezmurs.length}{me == cat ? m.mezmurs.length>1? " መዝሙሮች":" መዝሙር":""}
            </h4>
          </div>
          <hr />
        </li></Link>
      );
    }
  });
  return (
    <div className="md:my-10 my-5 w-[80%] gap-4 rounded-md lg:w-[30%] px-8 md:py-8 py-3 flex flex-col justify-start items-start  bg-gray">
      <h2 className="text-4xl text-white font-semibold mb-5">{title}</h2>
      <ul>{Lists}</ul>
      <button className="self-end">
       <Link to={`${me == cat ? '/categorylist': "/zemarilist"}`}>
       <div className={` ${me == mez && 'hidden'} bg-graymiddle bg-opacity-50 hover:bg-opacity-90  duration-200 p-2 rounded-md flex gap-2 text-xl justify-center items-center text-white`}>
          More <RiArrowRightLine />
        </div></Link>
      </button>
    </div>
  );
}

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { RiArrowRightLine } from "react-icons/ri";
// import { selectAllCategory, useGetCategorysQuery } from "../app/CategorySlice";
// import { useSelector } from "react-redux";
// import { selectAllZemari, useGetZemarisQuery } from "../app/ZemariSlice";
// import { selectAllMezmur, useGetMezmursQuery } from "../app/MezmurSlice";

// export default function ListsCard({ title }) {
//   const {isLoading: isLoadingCat,isSuccess: isSuccessCat} = useGetCategorysQuery()
//   const cat = useSelector(selectAllCategory);
//   const {isLoading: isLoadingMez,isSuccess: isSuccessMez} = useGetMezmursQuery()
//   const mez = useSelector(selectAllMezmur);
//   const {isLoading: isLoadingZem,isSuccess: isSuccessZem} = useGetZemarisQuery()
//   const zem = useSelector(selectAllZemari);
// let me = []
//   if(title=="Title"){me=mez}
//   else if(title=="Artists"){me=zem}
//   else if(title=="Category"){me=cat}
//   const Lists =  me.map((m) => {
//     return (
//       <li
//         key={m}
//         className="mb-2 hover:translate-x-2 cursor-pointer duration-300 text-white "
//       >
//         <div className="flex flex-col">
//           <h1 className="text-2xl">{me==mez &&m.title}{me==zem &&m.name}{me==cat &&m.title}</h1>
//           <h4 className="text-md">{me==mez &&m.zemari.name}{me==zem &&m.mezmur.count()}{me==cat &&m.mezmur.count()}</h4>
//         </div>
//         <hr />
//       </li>
//     );
//   });
//   return (
//     <div className="md:my-10 my-5 w-[80%] gap-4 rounded-md lg:w-[30%] px-8 md:py-8 py-3 flex flex-col justify-start items-start  bg-gray">
//       <h2 className="text-4xl text-white font-semibold mb-5">{title}</h2>
//       <ul>

//         {Lists}

//         </ul>
//       <button className="self-end">
//         <div className=" bg-graymiddle bg-opacity-50 hover:bg-opacity-90  duration-200 p-2 rounded-md flex gap-2 text-xl justify-center items-center text-white">
//           More <RiArrowRightLine />
//         </div>
//       </button>
//     </div>
//   );
// }
