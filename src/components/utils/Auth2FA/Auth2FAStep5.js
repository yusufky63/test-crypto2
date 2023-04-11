/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export function Auth2FAStep5() {
  return (
    <div class=" bg-white  mt-10 text-center">
      <h2 className="text-xl font-bold mb-2">Adım 5: Tamamlandı</h2>
      <div className="">
        <div className="flex justify-center">
          <img
            alt="success"
            className="w-28  my-20"
            src={require("../../../assets/img/verifactionSuccess.png")}
          />
        </div>

        <a
          href="/"
          className="bg-blue-500  hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ana Sayfa
        </a>
      </div>
    </div>
  );
}
