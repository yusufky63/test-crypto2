import React from "react";
import myLogo from "../../../assets/img/pageLinks.svg";
function PageLinks() {
  return (
    <div className="flex justify-center ">
      <div className="max-w-6xl flex flex-wrap md:flex-nowrap items-center ">
        <div>
          {" "}
          <img className="  " width={"90%"} src={myLogo} alt="resim" />
        </div>

        <div className="ml-3 text-start">
          <div>
            <h1 className="font-bold  sm:text-lg  lg:text-xl xl:text-2xl text-md ">
              Tüm Kriptolar Tek Yerde
            </h1>
            <p className="mb-1  sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm">
              200'den fazla Kripto parayı tek yerden inceleyin.
            </p>
            <a
              className="  md:text-md lg:text-lg xl:text-xl text-sm text-blue-600"
              href="/markets"
            >
              Kripto Paralar <i className="fa fa-arrow-right-long"></i>
            </a>
          </div>
          <br />
          <br />
          <div className="">
            <h1 className="font-bold   sm:text-lg  lg:text-xl xl:text-2xl text-md">
              Kripto Piyasasını Takip Edin.
            </h1>
            <p className="mb-1  sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm">
              Tüm Kripto Haberlerini güncel olarak alın ve Kripto gelişmelerini
              takip edin.
            </p>
            <a
              className="md:text-md lg:text-lg xl:text-xl text-sm text-blue-600"
              href="/news"
            >
              Haberler <i className="fa fa-arrow-right-long"></i>
            </a>
          </div>
          <br />
          <br />
          <div>
            <h1 className="font-bold   sm:text-lg  lg:text-xl xl:text-2xl text-md">
              Size Uygun 100'den Fazla Borsayı İnceleyin
            </h1>
            <p className="mb-1  sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm">
              Alım-Satım yapacağınız Kripto Borsasımı Arıyorsunuz işte burdalar
              hemen inceleyin.
            </p>
            <a
              className="  md:text-md lg:text-lg xl:text-xl text-sm text-blue-600"
              href="/exchanges"
            >
              Borsalar <i className="fa fa-arrow-right-long"></i>
            </a>
          </div>
          <br />
          <br />

          <div className="">
            <h1 className="font-bold   sm:text-lg  lg:text-xl xl:text-2xl text-md">
              Blokzincir Ve Kripto Akademisi
            </h1>
            <p className="mb-1  sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm">
              Blokzincir ve Kripto hakkında 10'larca Akademik bilgi burda.
            </p>
            <a
              className="  md:text-md lg:text-lg xl:text-xl text-sm text-blue-600"
              href="/academia"
            >
              Akademi <i className="fa fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLinks;
