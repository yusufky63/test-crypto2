import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DeleteIcon from '../../assets/icon/DeleteIcon'
import CheckPositiveNumber from '../../utils/CheckPositiveNumber'

function PortfolyoDetails({item,handleDelete,isOpen,closeModal}) {



  return (
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={closeModal}
    >
      <div className="min-h-screen px-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0" />
        </Transition.Child>
        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="inline-block h-screen align-middle"
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
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h2"
              className="text-lg flex justify-between  font-medium leading-6 text-gray-900"
            >
              {" "}
              <div className="flex h-6 w-6  ">
                <img
                  className="h-6 w-6 rounded-full mr-3"
                  src={item.image.small}
                  alt=""
                />
                {item.name}
              </div>
              <div className="text-xs items-center">
                <CheckPositiveNumber
                  textSize="11px"
                  number={
                    ((item.market_data.current_price.usd -
                      item.coin_price_usd) *
                      100) /
                    item.coin_price_usd
                  }
                />
                <p className="text-sm text-gray-500">
                  {(
                    item.market_data.current_price.usd -
                    item.coin_price_usd
                  ).toFixed(2)}
                  $
                </p>
              </div>
            </Dialog.Title>
            <div className="mt-3">
              <p className="text-sm text-gray-500">
                Miktar: {item.buy_total_crypto}
              </p>

              <p className="text-sm text-gray-500">
                Alım Fiyatı: {item.coin_price_usd}$
              </p>
              <p className="text-sm text-gray-500">
                Güncel Fiyat:{" "}
                {item.market_data.current_price.usd}$
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={closeModal}
              >
                Kapat
              </button>
              <a
                onClick={(e) => handleDelete(item.id)}
                className="hover:bg-red-300 hover:text-red-900 p-2 rounded-md  flex justify-center font-medium"
              >
                <DeleteIcon />
              </a>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
  )
}

export default PortfolyoDetails