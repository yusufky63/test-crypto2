/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import BuyCrypto from "../../components/modal/BuyCrypto";
import SellCrypto from "../../components/modal/SellCrypto";
import CheckPositiveNumber from "../../utils/CheckPositiveNumber";
import DeleteIcon from "../../assets/icon/DeleteIcon";
import {useState } from "react";

import PortfolyoDetails from "../../components/modal/PortfolyoDetails";

function PortfolyoTableMobileDesign({ data, handleDelete, portfolyo }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="text-[12px]">
      <table className="min-w-full divide-y-8 divide-x-8 border-white  bg-white">
        <thead className="">
          <tr className="text-center font-semibold text-gray-900">
            <th scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3">
              Coin
            </th>
            <th scope="col" className="whitespace-nowrap px-1 py-3.5">
              Miktar
            </th>
            <th scope="col" className="whitespace-nowrap px-1 py-3.5">
              Bakiye($)
            </th>
            {/* <th
                              scope="col"
                              className="whitespace-nowrap px-1 py-3.5"
                            >
                              Alım Fiyatı
                            </th> */}
            {/* <th
                              scope="col"
                              className="whitespace-nowrap px-1 py-3.5"
                            >
                              Güncel Fiyat
                            </th> */}
            {/* <th
                              scope="col"
                              className="whitespace-nowrap px-1 py-3.5"
                            >
                              Kar / Zarar Miktarı
                            </th> */}
            <th scope="col" className="whitespace-nowrap px-1 py-3.5">
              Kar / Zarar (%)
            </th>
            <th
              scope="col"
              className="whitespace-nowrap px-1 py-3.5 text-center"
            >
              İşlemler
            </th>
          </tr>
        </thead>

        <tbody className="border-gray-50 shadow-md rounded-lg   divide-y-8  bg-transparent">
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-gray-50 shadow-md rounded-lg border my-5   duration-300 ease-in-out"
            >
              <td className=" whitespace-nowrap  py-2 pl-2 pr-0 sm:pl-6">
                <div className="flex items-center">
                  <div className="h-6 w-6">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={item.image.small}
                      alt=""
                    />
                  </div>
                  <div className="ml-1">
                    <div className="text-gray-900 font-bold">
                      <Link to={`/markets/${item.id}`}>
                        {item.name}
                        <span className="uppercase  text-gray-500 ml-1">
                          {item.symbol}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </td>
              <td className="price whitespace-nowrap px-3 py-4 ">
                <div className="">
                  <h1>{item.buy_total_crypto.toFixed(5)}</h1>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4  text-gray-500">
                <div className="text-gray-900">
                  <h1>
                    {(
                      item.buy_total_crypto * item.market_data.current_price.usd
                    ).toFixed(2)}
                    $
                  </h1>
                </div>
              </td>
              {/* <td className="whitespace-nowrap px-3 py-4  text-gray-500">
                                {item.coin_price_usd}$
                              </td>
                              <td className="whitespace-nowrap px-3 py-4  text-gray-500">
                                <div className="text-gray-900">
                                  {item.market_data.current_price.usd}$
                                </div>
                              </td> */}
              {/* <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                                <div className="text-gray-900">
                                  {(
                                    (item.market_data.current_price.usd -
                                      item.coin_price_usd) *
                                    item.buy_total_crypto
                                  ).toFixed(2)}
                                  $
                                </div>
                              </td> */}
              <td className="whitespace-nowrap px-3 py-4  text-gray-500">
                <div className="">
                  <CheckPositiveNumber
                    textSize="11px"
                    number={
                      ((item.market_data.current_price.usd -
                        item.coin_price_usd) *
                        100) /
                      item.coin_price_usd
                    }
                  />
                </div>
              </td>
              <td className="p-1">
                <button className="hover:bg-green-400 hover:text-white border bg-white shadow-md rounded my-1 w-full">
                  <BuyCrypto cryptoID={portfolyo && item.id}></BuyCrypto>
                </button>
                <button className="hover:bg-red-400 hover:text-white border bg-white shadow-md rounded my-1 w-full">
                  <SellCrypto cryptoID={portfolyo && item.id}></SellCrypto>
                </button>
              </td>
              <td>
                <div className="flex flex-col">
                  <a
                    onClick={(e) => handleDelete(item.id)}
                    className="hover:bg-red-300 hover:text-red-900 p-2 rounded-md  flex justify-center font-medium"
                  >
                    <DeleteIcon />
                  </a>
                  <a
                    className="hover:bg-blue-300 hover:text-blue-900 p-2 rounded-md  flex justify-center font-medium"
                    rel="noreferrer"
                  >
                    <svg
                      onClick={openModal}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                  <PortfolyoDetails
                    item={item}
                    isOpen={isOpen}
                    closeModal={closeModal}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolyoTableMobileDesign;
