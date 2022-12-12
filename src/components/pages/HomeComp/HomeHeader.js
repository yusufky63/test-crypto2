import React from "react";

export default function HomeHeader() {
  return (
    <div className="flex justify-center bg-home-header">
      <div className="max-w-7xl container ">
        {" "}
        <h1 className="font-bold   lg:text-3xl xl:text-5xl text-2xl  my-16">
          Kripto Dünyasına Hoşgeldiniz
        </h1>
        <div className=" flex sm:flex-row flex-col justify-around items-center  mb-14  ">
          <div className=" font-bold   text-start  ">
            <h1 className="md:text-xl lg:text-2xl xl:text-4xl text-lg mb-2">
              {" "}
              Kripto Alıp - Satmanın dünyadaki <br />
              en popüler yeri
              <br />
            </h1>

            <p className="text-gray-600  mt-1  md:text-lg lg:text-xl xl:text-2xl text-md sm:whitespace-pre-wrap">
              2011'den beri milyonlarca insanın güveni ile <br />
              değeri 1 Trilyon doları aşan kripto para işlemleri.
            </p>
            {/* <div className="flex justify-start mt-10">
              {" "}
              <input type="text" className="border outline-none p-2 mr-3 rounded-lg shadow-md px-7" placeholder="E-Mail" />
              <button className="border rounded-lg shadow-md p-2 md:p-3 text-green-400 md:text-lg hover:bg-green-400 hover:text-white">Abone Olun</button>
            </div> */}
          </div>
          <br />

          <img
            className="mt-10 sm:mt-0 "
            width={"35%"}
            src={require("../../../img/svg-1.png")}
            alt="resim"
          />
        </div>
      </div>
    </div>
  );
}
