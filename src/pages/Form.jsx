import NavBar from "../components/navBar";
import React from 'react';
import BottomBar from "../components/BottomBar";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddMezmurMutation } from "../app/RequestsSlice";
import { useNavigate } from "react-router-dom";
import { selectAllCategory, useGetCategorysQuery } from "../app/CategorySlice";
import { useSelector } from "react-redux";
import { selectAllZemari, useGetZemarisQuery } from "../app/ZemariSlice";

export default function Form() {
  const cat = useSelector(selectAllCategory);
  const zem= useSelector(selectAllZemari)

  const navigator = useNavigate()
  const [addMezmur] = useAddMezmurMutation();
  const [body, setbody] = useState({});
  function submitHandler() {

   
    
    if (!body.zemari || !body.lyrics || !body.category || !body.title) {
      return toast.error("Please fill all fields", {
        position: "top-left",
        duration: 3000,
      });
    }

    addMezmur(body)
      .unwrap()
      .then(() => {
        setbody({})
        toast.success("Thank You for Supporting", {
          position: "top-left",
          duration: 3000,
        });
        setbody({
          zemari: '',
          lyrics: '',
          category: '',
          title: '',
        });
        navigator('/')
  
      })
      .catch((error) => {

        const errorMessage = error?.entities?.undefined || "An error occurred";
        toast.error(`Error: ${errorMessage}`, {
          position: "top-left",
          duration: 3000,
        });
      });
  }
  

  window.scrollTo(0, 0);
  const [zemariFound, setzemariFound] = useState();
  const [categoryFound, setcategoryFound] = useState();
  return (
    <div className="flex flex-col bg-gray">
      <NavBar />
      <div className=" px-4   md:py-20 w-full flex  items-center justify-center bg-gray">
        <div className="flex w-full justify-center items-center flex-col">
          <div className="flex border-2 text-white  border-graymiddle  p-6 justify-center rounded-lg md:flex-row flex-col gap-2">
            <div className="p-2 ">
              <h1 className="text-2xl text-white mb-2">Mezmur Title</h1>
              <input
                onChange={(e) =>
                  setbody({ ...body, [e.target.name]: e.target.value })
                }
                value={body.title || ''}
                placeholder="Type here . . ."
                className=" p-2  bg-transparent border-2 border-graymiddle rounded-md hover:outline-none active:outline-none duration-200 hover:border-white"
                type="text"
                name="title"
              />
              <h1 className="text-2xl text-white mb-2">Category</h1>
              <div className="flex items-center gap-2 justify-between">
                <select
                value={body.category|| ''}
                  onChange={(e) =>
                    setbody({ ...body, [e.target.name]: e.target.value })
                  }
                  className={`${
                    !categoryFound ? "" : "hidden"
                  } mb-2   p-2 bg-transparent border-2 border-graymiddle rounded-md hover:outline-none active:outline-none duration-200 hover:border-white`}
                  name="category"
                  id=""
                >
                  <option className="bg-sla
                  te-600 text-white font-bold"  value="''">Select from here</option>
                  {
                    cat.map(c=>{
                     return <option className="bg-slate-600 text-white font-bold"   key={c._id} value={c.name}>{c.name}</option>
                    })
                  }
                </select>
                <input
                value={body.category|| ''}
                  onChange={(e) =>
                    setbody({ ...body, [e.target.name]: e.target.value })
                  }
                  placeholder="Type here . . ."
                  className={`${
                    categoryFound ? "" : "hidden"
                  }  p-2 bg-transparent border-2 border-graymiddle rounded-md duration-200 hover:outline-none active:outline-none hover:border-white`}
                  type="text"
                  name="category"
                />
                <button
                  className=" p-2 my-2   bg-graymiddle text-white rounded-md hover:outline-none active:outline-none duration-200 hover:bg-opacity-50"
                  onClick={() => setcategoryFound(!categoryFound)}
                >
                  {categoryFound ? "List?" : "Other?"}
                </button>
              </div>

              <h1 className="text-2xl text-white mb-2">Zemari</h1>
              <div className="flex gap-2  items-center justify-between">
                <select
                value={body.zemari|| ''}
                  name="zemari"
                  onChange={(e) =>
                    setbody({ ...body, [e.target.name]: e.target.value })
                  }
                  className={`${
                    !zemariFound ? "" : "hidden"
                  } mb-2   p-2 bg-transparent  border-2 border-graymiddle rounded-md hover:outline-none active:outline-none duration-200 hover:border-white`}
                  id=""
                >
                  <option className="bg-slate-600 text-white font-bold"  value="''">Select from here</option>
            
                  {
                    zem.map(c=>{
                     return <option className="bg-slate-600 text-white font-bold"  key={c._id} value={c.name}>{c.name}</option>
                    })
                  }
                </select>
                <input
                  name="zemari"
                  value={body.zemari|| ''}
                  onChange={(e) =>
                    setbody({ ...body, [e.target.name]: e.target.value })
                  }
                  placeholder="Type here . . ."
                  className={`${
                    zemariFound ? "" : "hidden"
                  }  p-2 bg-transparent border-2 border-graymiddle rounded-md duration-200 hover:outline-none active:outline-none hover:border-white`}
                  type="text"
                />
                <button
                  className=" p-2 my-2 flex-9   bg-graymiddle text-white rounded-md hover:outline-none active:outline-none duration-200 hover:bg-opacity-50"
                  onClick={() => setzemariFound(!zemariFound)}
                >
                  {zemariFound ? "List?" : "Other?"}
                </button>
              </div>
            </div>{" "}
            <div className="flex flex-col">
              <h1 className="text-2xl text-white mb-2">Lyrics</h1>
              <textarea
                value={body.lyrics|| ''}
                onChange={(e) =>
                  setbody({ ...body, [e.target.name]: e.target.value })
                }
                className="h-[90%]  p-2 bg-transparent border-2 border-graymiddle rounded-md hover:outline-none active:outline-none duration-200 hover:border-white"
                name="lyrics"
                id=""
              ></textarea>
              <button
                onClick={(e) => submitHandler(e)}
                className="  p-2 my-2  bg-graymiddle text-white rounded-md hover:outline-none active:outline-none duration-200 hover:bg-opacity-50"
              >
                Submit
              </button>
            </div>{" "}
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
