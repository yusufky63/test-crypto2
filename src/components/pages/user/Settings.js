import React from "react";
import {CryptoState} from "../../redux/CryptoContext";
import LastLogins from "./LastLogins";

function Settings() {
  const {currency, setCurrency} = CryptoState();

  return (
    <div className=" flex justify-center mt-10">
      <div className=" w-full max-w-4xl">
        <h1 className="my-5 text-5xl text-red-500"> Geliştirme Aşamasında </h1>
        <h1 className="text-4xl text-left px-4 font-bold">Ayarlar</h1>
        <ul className="text-left p-4">
          <li className="border p-2 rounded-lg shadow-sm my-3">
            <h1 className="font-bold text-xl">Listelenecek Veri Sayısı </h1>
            <span className="flex items-center justify-between">
              <label>Kayan Fiyat Listesi (Widget) </label>
              <select
                className="rounded-lg  p-1 border m-2  outline-none"
                name="coin"
                id="coin50"
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
              </select>
            </span>
            <span className="flex items-center justify-between">
              <label>Piyasalar </label>
              <select
                className="rounded-lg  p-1 m-2 border  outline-none "
                name="coin"
                id="coin50"
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
              </select>
            </span>
            <span className="flex items-center justify-between">
              <label>Borsalar </label>
              <select
                className="rounded-lg  p-1  m-2 border  outline-none"
                name="coin"
                id="coin50"
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
              </select>
            </span>
          </li>
          <li className="border p-2 rounded-lg shadow-sm my-3">
            <span className="flex items-center justify-between m-2">
              <label className="text-start">Tema </label>
              <span className="px-2 mx-2">
                <input type="radio" name="theme" id="dark" />
                <label className="m-1" htmlFor="dark">
                  Dark
                </label>
              </span>
              <span>
                <input type="radio" name="theme" id="light" />
                <label className="m-1" htmlFor="light">
                  Light
                </label>
              </span>
            </span>
          </li>
          <li className="border p-2 rounded-lg shadow-sm my-3">
            <span className="flex items-center justify-between ">
              <h1>Para Birimi </h1>
              <select
                value={currency}
                className="rounded-lg  p-1 m-2 border  outline-none"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value={"TRY"}>TRY</option>
                <option value={"USD"}>USD</option>
              </select>
            </span>
          </li>
          <li>
            <LastLogins />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Settings;
