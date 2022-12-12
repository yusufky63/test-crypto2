import React from "react";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="flex justify-center">
      {" "}
      <div className="grid h-96 w-4/6 justify-center place-items-center bg-white border rounded-lg shadow-lg my-20">
        <div className="">
          {" "}
          <span className=" text-6xl  lg:text-8xl text-red-500 lg:hover:text-9xl hover:text-7xl">
            4
          </span>{" "}
          <span className=" text-6xl  lg:text-8xl text-red-500 lg:hover:text-9xl hover:text-7xl">
            0
          </span>
          <span className=" text-6xl  lg:text-8xl text-red-500 lg:hover:text-9xl hover:text-7xl">
            4
          </span>
          <h1 className="text-gray-500 text-xl  lg:text-4xl my-10">
            Sayfa Bulunamadı !
          </h1>
          <Link
            to={"/"}
            className="flex justify-center   mx-2 border shadow-md rounded-md p-3  hover:bg-gray-300 "
          >
            <span className="text-md lg:text-xl ml-2"> Geri Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page404;
