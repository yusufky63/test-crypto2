/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import {
  login,
  resetPassword,
  githubLogin,
  googleLogin,
} from "../../services/Firebase/FirebaseProfile";
import GoogleIcon from "../../assets/icon/GoogleIcon";
import GithubIcon from "../../assets/icon/GithubIcon";
import CloseIcon from "../../assets/icon/CloseIcon";

export default function Login() {
  let [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <a className="w-full " onClick={openModal}>
        Giriş Yap
      </a>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto w-full "
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
              <div className="inline-block w-full max-w-sm p-6 my-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl  border border-gray-200">
                <button
                  onClick={closeModal}
                  className=" text-red-500 hover:bg-red-200 rounded-lg p-2"
                >
                  <CloseIcon />
                </button>
                <br />
                <br />
                <div className="flex justify-around mx-10">
                  <button
                    onClick={githubLogin}
                    type="button"
                    className="inline-block px-12 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    style={{ backgroundColor: "#333" }}
                  >
                    <GithubIcon />
                  </button>
                  <button
                    onClick={googleLogin}
                    type="button"
                    className="inline-block px-12 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    style={{ backgroundColor: "#ea4335" }}
                  >
                    <GoogleIcon />
                  </button>
                </div>

                <Dialog.Title
                  as="h3"
                  className=" text-center text-2xl my-3 font-bold leading-10 text-gray-900"
                >
                  Giriş Yap
                </Dialog.Title>
                <div className="flex justify-center my-5 text-sm mx-10 bg-green-100 p-2 rounded-lg">
                  <div className="text-center ">
                    <span className="text-green-600">https://</span>
                    cryptoxchain/login
                  </div>
                </div>
                <div className="flex justify-center">
                  <div>
                    <label htmlFor="floatingInput" className="text-gray-700">
                      Email
                    </label>
                    <div className="form-floating mb-3 w-full">
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className="form-control
      block
      w-full
      px-10
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="floatingInput"
                        placeholder="adresin@gmail.com"
                      />
                    </div>
                    <label htmlFor="floatingPassword" className="text-gray-700">
                      Şifre
                    </label>
                    <div className="form-floating mb-3 w-full">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="form-control
      block
      w-full
      px-10
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="floatingPassword"
                        placeholder="Şifre"
                      />
                    </div>
                    <a
                      onClick={() => resetPassword(email)}
                      className="text-indigo-500 flex justify-end mb-2 text-sm cursor-pointer"
                    >
                      Şifremi Unuttum
                    </a>
                  </div>
                </div>

                <div className="mt-4 text-center flex justify-around">
                  <button
                    onClick={handleLogin}
                    type="button"
                    className="inline-flex justify-center  py-2 w-3/4  text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 duration-300"
                  >
                    Giriş Yap
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
