/* eslint-disable no-unused-vars */
import { RiMusic2Line } from "react-icons/ri";
import { BsPersonLinesFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { selectAllMezmur, useGetMezmursQuery } from "../app/MezmurSlice";
import { useSelector } from "react-redux";
import React from 'react';
import { format } from "timeago.js";

export default function RecentlyAddedCard() {
  const { isLoading, isFetching, isSuccess } = useGetMezmursQuery(undefined, {refetchOnMountOrArgChange: true});
  const mez = useSelector(selectAllMezmur);

  const Lists = mez.map((m, index) => {
    if (index < 12) {
      return (
        <Link key={m._id} to={`/lyrics/${m._id}`}>
          <div className="flex hover:-translate-y-2 border-graymiddle  border-2 hover:border-white duration-300 cursor-pointer flex-col bg-graymiddle px-2 py-2 md:p-8 md:px-10 md:py-3 rounded-lg">
            <div className="flex items-center gap-3">
              <RiMusic2Line className="text-white" />
              <h3 className="md:text-3xl text-white ">{m.title}</h3>
            </div>
            <div className="flex items-center gap-3">
              <BsPersonLinesFill className="text-white" />
              <h3 className="md:text-xl text-white text-xs">{m.zemari.name}</h3>
            </div>
            <h4 className="text-white md:text-lg text-xs self-end">
              Added <span>{format(m.createdAt)}</span>
            </h4>
          </div>
        </Link>
      );
    }
  });
  return <>{Lists}</>;
}
