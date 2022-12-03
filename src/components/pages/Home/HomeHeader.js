import React from "react";

export default function HomeHeader() {
  return (
    <>
      {" "}
      <h1 className="font-bold sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl text-xl  my-16">
        Kripto Dünyasına Hoşgeldiniz
      </h1>
      <div className=" flex justify-center items-center  mb-20 lg:mr-20 ">
        <div className="slide-in-left font-bold   text-start  sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-lg">
          Kripto satın almanın, satmanın ve <br /> kripto ticareti yapmanın
          dünyadaki <br />
          en popüler yolu
          <br />
          <br />
          <p className="text-gray-900  sm:text-xs md:text-xl lg:text-2xl xl:text-3xl text-sm sm:whitespace-pre-wrap">
            2011'den beri milyonlarca insanın güveni ile <br />değeri 1 Trilyon
            doları aşan kripto para işlemleri.
          </p>
        </div>
        <br />

        <img
          className="slide-in-right xl:ml-20 "
          width={"30%"}
          src={require("../../../img/svg-1.png")}
          alt="resim"
        />
      </div>
    </>
  );
}
