/* eslint-disable react/prop-types */
import { RiMusic2Line } from "react-icons/ri";
import { BsPersonLinesFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Tezamach } from "./Related";
import React from 'react';
import { format } from "timeago.js";

export default function RelatedListCard({ id }) {
  const tezamach = Tezamach(id);
  const Lists = tezamach.map((m) => {
    return (
      <Link to={`/lyrics/${m._id}`} key={m}>
         
        <div className="flex hover:-translate-y-2 border-graymiddle  border-2 hover:border-white duration-300 cursor-pointer flex-col bg-graymiddle px-6 py-2 md:py-3 md:px-10 rounded-lg">
          <div className="flex items-center gap-3">
            <RiMusic2Line className="text-white" />
            <h3 className="md:text-2xl text-white ">{m.title}</h3>
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
  });
  return <>{Lists}</>;
}
