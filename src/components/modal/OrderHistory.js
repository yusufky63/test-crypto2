/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import OrderHistoryDelete from "../modal/OrderHistoryDelete";
import LoadingIcon from "../../assets/icon/LoadingIcon";
import HistoryIcon from "../../assets/icon/HistoryIcon";
import CloseIcon from "../../assets/icon/CloseIcon";
export default function OrderHistory() {
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { order } = useSelector((state) => state.orders);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [order]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const sortedOrder = [...order].sort((a, b) => {
    return b.order_date.toDate() - a.order_date.toDate();
  });

  return (
    <>
      <button
        onClick={openModal}
        className=" z-30 lg:w-44 p-3 w-32 items-center px-5 text-sm sm:text-lg lg:text-base flex justify-around shadow-lg rounded-lg right-0 hover:bg-gray-100 drop-shadow-xl mt-5 hover:mb-2 transition-shadow absolute"
      >
        <HistoryIcon />
        Geçmiş
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0  z-40 overflow-y-auto w-full "
          onClose={closeModal}
        >
          <div className="max-h-screen px-4 text-center ">
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
              <div className="inline-block w-full xl:w-3/4 p-6 my-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl  border border-gray-200">
                <button
                  onClick={closeModal}
                  className=" text-red-500 hover:bg-red-200 rounded-lg p-2"
                >
              <CloseIcon />
                </button>
                <br />

                <div className="flex shadow-md items-center mb-2  justify-between p-3">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl   font-bold   text-gray-600"
                  >
                    Geçmiş Emirler
                  </Dialog.Title>
                  <div className="">
                    Kayıt Sayısı :
                    <span className="rounded-lg text-sm text-white  p-1 bg-gray-600">
                      {order && order.length}
                    </span>
                  </div>
                </div>
                <div className="my-5">
                  <div className="mt-4 flex flex-col">
                    <div className="flex justify-end items-center"> </div>
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5   md:rounded-lg">
                          {loading ? (
                            <div className="flex  justify-center" role="status">
                              <LoadingIcon />
                            </div>
                          ) : (
                            <>
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50 ">
                                  <tr className="text-center">
                                    <th
                                      scope="col"
                                      className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                                    >
                                      İşlem ID
                                    </th>

                                    <th
                                      scope="col"
                                      className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                                    >
                                      İşlem Türü
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                                    >
                                      İşlem Adı
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                                    >
                                      İşlem Fiyatı
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                                    >
                                      İşlem Miktarı
                                    </th>

                                    <th
                                      scope="col"
                                      className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                                    >
                                      İşlem Tarihi
                                    </th>
                                  </tr>
                                </thead>

                                <tbody className=" divide-y divide-gray-200 bg-white  ">
                                  {sortedOrder
                                    .slice(
                                      (page - 1) * 10,
                                      (page - 1) * 10 + 10
                                    )
                                    .map((item) => (
                                      <tr
                                        id="priceT"
                                        className="hover:bg-gray-100 hover:px-10 text-center"
                                        key={item.id}
                                      >
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="text-gray-900">
                                            {item.id}
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="text-gray-900">
                                            {item.order_type === "BUY" ? (
                                              <span className="text-green-500">
                                                {item.order_type}
                                              </span>
                                            ) : (
                                              <span className="text-red-500">
                                                {item.order_type}
                                              </span>
                                            )}
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="text-gray-900 uppercase">
                                            {item.order_coin}
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="text-gray-900">
                                            {item.order_coin_price_usd} $
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="text-gray-900">
                                            {item.order_coin_price_usd_buy_total_crypto.toFixed(
                                              5
                                            )}
                                          </div>
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="text-gray-900">
                                            {new Date(
                                              item.order_date.toDate()
                                            ).toLocaleString()}
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                              <Pagination
                                count={Number((order.length / 10).toFixed(0))}
                                variant="outlined"
                                shape="rounded"
                                color="warning"
                                style={{
                                  padding: 30,

                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                onChange={(_, value) => {
                                  setPage(value);
                                  window.scroll(0, 450);
                                }}
                              />
                              <div className="flex justify-end items-center">
                                <OrderHistoryDelete />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
