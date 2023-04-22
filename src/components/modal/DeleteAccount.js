/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { deletAccount } from "../../services/Firebase/FirebaseProfile";

export default function DeleteAccount() {
  let [isOpen, setIsOpen] = useState(false);

  //   const [password, setPassword] = useState("");
  const handleDelete = () => {
    deletAccount();
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <a className=" w-full " onClick={openModal}>
        Hesabı Sil
      </a>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto w-full bg-gray-500 bg-opacity-50"
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
              <div className="inline-block w-full max-w-md p-6 my-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl  border border-gray-200">
                <Dialog.Title
                  as="h3"
                  className=" text-center text-2xl my-3 font-bold leading-10 text-red-600"
                >
                  Hesabı Sil
                </Dialog.Title>
                <Dialog.Description className="text-center text-gray-500 text-xl ">
                  Hesabınızı silmek istediğinize emin misiniz?
                </Dialog.Description>

                <p className="text-center m-3">
                  Bu işlem Tüm Verilerinizi Ve Hesabınızı Silecektir !
                </p>
                <div className="flex justify-center">
                  <div>
                    <div className="form-floating mb-3  max-w-md">
                      {/* <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="form-control
      block
    w-80
      px-5
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded-lg
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="floatingPassword"
                        placeholder="Şifre"
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center flex justify-around">
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="inline-flex justify-center  py-2 w-3/4  text-white bg-red-600 border border-transparent rounded-md hover:bg-red-900 duration-300"
                  >
                    Hesabı Sil
                  </button>
                </div>
                <div className="mt-4 text-center flex justify-around">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="inline-flex justify-center  py-2 w-3/4  text-black bg-white border border-gray-300  rounded-md hover:bg-gray-300 duration-300"
                  >
                    Geri
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
