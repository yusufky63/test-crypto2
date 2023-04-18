/* eslint-disable jsx-a11y/anchor-is-valid */
import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Pagination} from "@mui/material";
import OrderHistoryDelete from "../modal/OrderHistoryDelete";
export default function OrderHistory() {
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const {order} = useSelector((state) => state.orders);
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
        <svg
          className={"xl:w-6  xl:h-6 w-5 h-5"}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
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
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
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
                              <svg
                                className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span className="sr-only">Loading...</span>
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
