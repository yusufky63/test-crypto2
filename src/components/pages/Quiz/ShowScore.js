import React from "react";
import {Link} from "react-router-dom";
function ShowScore({questions, trueAnswer, falseAnswer, handleRestart}) {
  return (
    <div className="bg-gray-100 rounded flex flex-col justify-center items-center">
      <div className=" bg-white p-10 rounded shadow-lg w-full">
        <h1 className="text-3xl font-bold mb-5">Quiz Sonucu</h1>
        <p className="flex flex-col text-xl text-gray-600 my-5 font-bold">
          Soru sayısı
          <span className="text-gray-800 text-2xl font-bold">
            {questions.length}
          </span>
        </p>
        <div className="flex justify-between items-center  font-bold">
          <p className="flex flex-col text-xl text-gray-600 mb-5 ">
            Doğru Sayısı
            <span className="text-white font-bold bg-emerald-400 rounded-md">
              {trueAnswer}
            </span>
          </p>
          <p className=" flex flex-col text-xl text-gray-600 mb-5">
            Yanlış Sayısı
            <span className="text-white font-bold bg-red-400 rounded-md">
              {falseAnswer}
            </span>
          </p>
        </div>

        <p className="flex flex-col justify-center items-center text-center text-xl font-bold ">
          <span className="text-gray-600">Başarı Yüzdesi</span>
          <span
            className={
              (trueAnswer / questions.length) * 100 > 50
                ? "text-white font-bold bg-emerald-400  w-20 h-20 rounded-full flex justify-center items-center text-xl"
                : "text-white font-bold bg-red-700 w-20 h-20 rounded-full flex justify-center items-center text-xl shadow-lg "
            }
          >
            {((trueAnswer / questions.length) * 100).toFixed(2)}%
          </span>
        </p>
        <div className="flex justify-between items-center">
          <button
            className="rounded-lg bg-white hover:bg-emerald-500 inline-flex  hover:text-white text-emerald-500 font-bold py-2 px-4 items-center  shadow-md"
            onClick={handleRestart}
          >
            <span className="ml-2">Tekrar Dene</span>
          </button>
          <Link
            className="rounded-lg px-10 bg-white hover:bg-red-600 inline-flex hover:text-white text-red-500 shadow-md font-bold py-2 items-center"
            to={"/quiz"}
          >
            Kapat
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShowScore;
