/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { SingleCoin } from "../../services/Api";

import { CryptoState } from "../redux/CryptoContext";
import { addPortfolyo, updatePorfolyo } from "../../services/firebase";
import numberWithCommas from "../utils/convertCurrency";

function SellCrypto({ cryptoID }) {
  const { portfolyo } = useSelector((state) => state.portfolios);
  console.log(portfolyo);

  let [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();


  const [amount, setAmount] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
  const [totalTRY, setTotalTRY] = useState(0);

  const currencyEdit = currency.toLowerCase();
  const total = currencyEdit === "usd" ? totalUSD : totalTRY;

  useEffect(() => {
    if (coin) {
      setTotalUSD(amount / coin.market_data.current_price.usd);
      setTotalTRY(amount / coin.market_data.current_price.try);
    }
  }, [amount, coin, currencyEdit]);

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(cryptoID));


    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  console.log(coin);

  const handleBuy = () => {
    const data = portfolyo.find((item) => item.coin === coin.id);
    if (!data)
      addPortfolyo({
        uid: user.uid,
        coin: coin.id,
        coin_price_usd: coin.market_data.current_price.usd,
        coin_price_try: coin.market_data.current_price.try,
        buy_total_crypto_TRY: totalTRY,
        buy_total_crypto_USD: totalUSD,
        buy_date: new Date(),
      });
    else {
      console.log(portfolyo.id);
      updatePorfolyo(data.id, {
        uid: user.uid,
        coin: coin.id,
        coin_price_usd: coin.market_data.current_price.usd,
        coin_price_try: coin.market_data.current_price.try,
        buy_total_crypto_TRY: totalTRY - data.buy_total_crypto_TRY,
        buy_total_crypto_USD: totalUSD - data.buy_total_crypto_USD,
        buy_date: new Date(),
      });
    }
    setAmount(0);
    setTotalTRY(0);
    setTotalUSD(0);

    closeModal();
  };

  return (
    <div>
      {" "}
      <div className="bg-red-500 text-white">
        {" "}
        <a className=" w-full " onClick={openModal}>
          SAT
        </a>
      </div>
      {coin && (
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
                        className="text-red-700 text-2xl font-bold"
                      >
                        SAT
                      </DialogTitle>
                    </div>
                    <div className="">
                      <h1 className="text-xl ">
                        {coin.name}
                        <span className="text-gray-500 text-xs uppercase px-2">
                          {coin.symbol}
                        </span>
                      </h1>
                      <h1 className="font-bold text-gray-500 text-xl">
                        {numberWithCommas(
                          coin.market_data.current_price[currencyEdit]
                        )}{" "}
                        {symbol}
                      </h1>
                      <br />
                    </div>
                    <div className="flex items-center  border rounded-lg">
                      <h1 className="text-2xl p-4">{symbol}</h1>
                      <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="text "
                        className="border-l-2 text-gray-600 outline-none p-3   placeholder:text-end w-full"
                        placeholder={currency}
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
                        value={total.toFixed(6)}
                        type="text "
                        className="border-l-2 text-gray-600 outline-none p-3  placeholder:uppercase placeholder:text-end w-full"
                        placeholder={coin.symbol}
                      />
                    </div>

                    <div>
                      <button
                        onClick={handleBuy}
                        className=" border w-full p-2 mt-5 text-white rounded-lg bg-red-600 hover:bg-red-800"
                      >
                        Sat
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

export default SellCrypto;
