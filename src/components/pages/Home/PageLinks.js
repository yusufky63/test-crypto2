import React from "react";
import myLogo from "../../../img/available-assets.svg";
function PageLinks() {
  return (
    <div className="flex justify-between items-center mx-14">
      <div>
        <img
          className="hidden lg:block  "
          width={"100%"}
          src={myLogo}
          alt="resim"
        />
      </div>
      <div className="text-start">
        <div>
          <h1 className="font-bold   sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-lg whitespace-nowrap">
            Tüm Kriptolar Tek Yerde
          </h1>
          <p className="mb-1   sm:text-sm md:text-xl lg:text-xl xl:text-2xl text-sm">
            200'den fazla Kripto parayı tek yerden inceleyin.
          </p>
          <a
            className=" sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-sm text-blue-600"
            href="/allcoins"
          >
            Kripto Paralar <i className="fa fa-arrow-right-long"></i>
          </a>
        </div>
        <br />
        <br />
        <div className="">
          <h1 className="font-bold   sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-lg whitespace-nowrap">
            Kripto Piyasasını Takip Edin.
          </h1>
          <p className="mb-1   sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-sm">
            Tüm Kripto Haberlerini güncel olarak alın ve Kripto gelişmelerini
            takip edin.
          </p>
          <a
            className=" sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-sm text-blue-600"
            href="/news"
          >
            Haberler <i className="fa fa-arrow-right-long"></i>
          </a>
        </div>
        <br />
        <br />
        <div>
          <h1 className="font-bold   sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-lg whitespace-nowrap">
            100'den Fazla Borsayı İnceleyin
          </h1>
          <p className="mb-1  sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-sm">
            Alım-Satım yapacağınız Kripto Borsasımı Arıyorsunuz işte burdalar
            hemen inceleyin.
          </p>
          <a
            className=" sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-sm text-blue-600"
            href="/exchanges"
          >
            Borsalar <i className="fa fa-arrow-right-long"></i>
          </a>
        </div>
        <br />
        <br />

        <div className="">
          <h1 className="font-bold   sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-lg whitespace-nowrap">
            Blokzincir Ve Kripto Akademisi
          </h1>
          <p className="mb-1   sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-sm">
            Blokzincir ve Kripto hakkında 10'larca Akademik bilgi burda.
          </p>
          <a
            className=" sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-sm text-blue-600"
            href="/academia"
          >
            Akademi <i className="fa fa-arrow-right-long"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PageLinks;
