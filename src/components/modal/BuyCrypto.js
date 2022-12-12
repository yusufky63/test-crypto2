/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { SingleCoin } from "../../services/Api";

import {
  addPortfolyo,
  updatePorfolyo,
  addOrderHistory,
} from "../../services/firebase";
import numberWithCommas from "../utils/NumberWithCommas";

function BuyCrypto({ cryptoID }) {
  const { portfolyo } = useSelector((state) => state.portfolios);
  const { user } = useSelector((state) => state.auth);
  const data = portfolyo.find((item) => item.coin === cryptoID);

  let [isOpen, setIsOpen] = useState(false);
  const [coin, setCoin] = useState();
  const [amount, setAmount] = useState(null);
  const [totalUSD, setTotalUSD] = useState(0);

  const fetchCoin = async () => {
    if (cryptoID) {
      const { data } = await axios.get(SingleCoin(cryptoID));
      setCoin(data);
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (coin) {
      setTotalUSD(amount / coin.market_data.current_price.usd);
    }
  }, [amount, coin]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleBuy = () => {
    const data = portfolyo.find((item) => item.coin === coin.id);
    if (!data) {
      addPortfolyo({
        uid: user.uid,
        coin: coin.id,
        coin_price_usd: coin.market_data.current_price.usd,
        buy_total_crypto: totalUSD,
        buy_date: new Date(),
      });
      addOrderHistory({
        uid: user.uid,
        order_type: "BUY",
        order_coin: coin.id,
        order_coin_price_usd: coin.market_data.current_price.usd,
        order_coin_price_usd_buy_total_crypto: totalUSD,
        order_date: new Date(),
      });
    } else {
      console.log(portfolyo.id);
      updatePorfolyo(data.id, {
        uid: user.uid,
        coin: coin.id,
        coin_price_usd: coin.market_data.current_price.usd,
        buy_total_crypto: totalUSD + data.buy_total_crypto,
        buy_date: new Date(),
      });
      addOrderHistory({
        uid: user.uid,
        order_type: "BUY",
        order_coin: coin.id,
        order_coin_price_usd: coin.market_data.current_price.usd,
        order_coin_price_usd_buy_total_crypto: totalUSD,
        order_date: new Date(),
      });
    }
    setAmount(null);
    portfolyo();
    setTotalUSD(0);
    closeModal();
  };

  return (
    <div>
      {" "}
      <div className=" hover:bg-green-400 hover:text-white text-green-600">
        {" "}
        <a className=" w-full " onClick={openModal}>
          AL
        </a>
      </div>
      {coin && user && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto w-full bg-gray-500   bg-opacity-50"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 " />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle "
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-sm p-3 my-4 overflow-hidden  align-middle transition-all transform bg-white shadow-xl rounded-2xl  border border-gray-200 ">
                  <div>
                    <div>
                      <DialogTitle
                        as="div"
                        className="text-green-700 text-2xl font-bold"
                      >
                        Al
                      </DialogTitle>
                    </div>
                    <div className="">
                      <h1 className=" items-center">
                        <span className="text-xl"> {coin.name}</span>
                        <span className="text-gray-500 text-xs uppercase px-2">
                          {coin.symbol}
                        </span>
                      </h1>
                      <h1 className="font-bold text-gray-500 text-xl">
                        {numberWithCommas(coin.market_data.current_price.usd)} $
                      </h1>
                      <br />
                    </div>
                    <div className="flex items-center  border rounded-lg">
                      <h1 className="text-2xl p-4">$</h1>
                      <input
                        min={1}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        className="border-l-2 text-gray-600 outline-none p-3   w-full"
                        placeholder="0.00 USD"
                      />
                    </div>
                    <br />
                    <div className="flex items-center px-2 border rounded-lg p-2">
                      <img
                        className="flex justify-center  rounded-lg w-10"
                        src={coin.image.small}
                        alt=""
                      />
                      <input
                        value={totalUSD.toFixed(6)}
                        type="number"
                        className="border-l-2 text-gray-600 outline-none p-3  placeholder:uppercase placeholder:text-end w-full"
                        placeholder={coin.symbol}
                      />
                    </div>
                    {data && (
                      <h1 className="text-start my-2 text-sm text-gray-500 flex justify-between">
                        <span>
                          {" "}
                          Hesaptaki {coin.name} :{" "}
                          {data.buy_total_crypto.toFixed(6)}{" "}
                        </span>

                        <span>
                          {" "}
                          Fiyatı :{" "}
                          {(
                            data.buy_total_crypto *
                            coin.market_data.current_price.usd
                          ).toFixed(3)}
                          $
                        </span>
                      </h1>
                    )}
                    <div>
                      <button
                        disabled={!totalUSD}
                        onClick={handleBuy}
                        className=" border w-full p-2 mt-5 text-white rounded-lg bg-green-600 hover:bg-green-800"
                      >
                        Satın Al
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
}

export default BuyCrypto;
