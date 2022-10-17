import React from "react";

function PageLinks() {
  return (
    <div className="flex justify-between items-center mx-20">
      <div>
        <img
          className="hidden md:block  "
          width={"90%"}
          src={require("../../../img/home-image-1.gif")}
          alt="resim"
        />
      </div>
      <div className="text-start">
        <div>
          <h1 className="font-bold   sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-sm whitespace-nowrap">
            Tüm Kriptolar Tek Yerde
          </h1>
          <p className="mb-1   sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-xs">
            200'den fazla Kripto parayı tek yerden inceleyin.
          </p>
          <a
            className=" sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-xs text-blue-600"
            href="/coins"
          >
            Kripto Paralar <i className="fa fa-arrow-right-long"></i>
          </a>
        </div>
        <br />
        <br />
        <div className="">
          <h1 className="font-bold   sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-sm whitespace-nowrap">
            Kripto Piyasasını Takip Edin.
          </h1>
          <p className="mb-1   sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-xs">
            Tüm Kripto Haberlerini güncel olarak alın ve Kripto gelişmelerini
            takip edin.
          </p>
          <a
            className=" sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-xs text-blue-600"
            href="/news"
          >
            Haberler <i className="fa fa-arrow-right-long"></i>
          </a>
        </div>
        <br />
        <br />
        <div>
          <h1 className="font-bold   sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-sm whitespace-nowrap">
            100'den Fazla Borsayı İnceleyin
          </h1>
          <p className="mb-1  sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-xs">
            Alım-Satım yapacağınız Kripto Borsasımı Arıyorsunuz işte burdalar
            hemen inceleyin.
          </p>
          <a
            className=" sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-xs text-blue-600"
            href="/exchanges"
          >
            Borsalar <i className="fa fa-arrow-right-long"></i>
          </a>
        </div>
        <br />
        <br />

        <div className="">
          <h1 className="font-bold   sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-sm whitespace-nowrap">
            Blokzincir Ve Kripto Akademisi
          </h1>
          <p className="mb-1   sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-xs">
            Blokzincir ve Kripto hakkında 10'larca Akademik bilgi burda.
          </p>
          <a
            className=" sm:text-xs md:text-xl lg:text-xl xl:text-2xl text-xs text-blue-600"
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
