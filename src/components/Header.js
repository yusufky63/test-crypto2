/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { CryptoState } from "./redux/CryptoContext";
import ModalLogin from "./modal/ModalLogin";
import ModalRegister from "./modal/ModalRegister";
import { logout } from "../services/firebase";
import { useSelector } from "react-redux";
function Header() {
  const { user } = useSelector((state) => state.auth);
  const { currency, setCurrency } = CryptoState();

  return (
    <>
      <Disclosure as="nav" className="bg-white navbar ">
        {({ open }) => (
          <>
            <div className="mx-auto  max-w-7xl px-2 sm:px-6 ">
              <div className="relative flex h-20 items-center justify-between ">
                <div className="absolute  inset-y-0 left-0 flex items-center lg:hidden  ">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className=" inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className=" flex flex-1 items-center justify-center sm:items-stretch ">
                  <div className="flex  flex-shrink-0 items-center "></div>
                  <div className="hidden sm:ml-6 lg:block ">
                    <div className="flex space-x-4  justify-center items-center  ">
                      <div>
                        {" "}
                        <NavLink
                          className="mx-2 text-xl text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md  "
                          to="/"
                        >
                          Ana Sayfa
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          className="mx-2  text-xl  text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/allcoins"
                        >
                          Piyasalar
                        </NavLink>
                      </div>
                      <div>
                        <NavLink
                          className="mx-2  text-xl  text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/exchanges"
                        >
                          Borsalar
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          className="mx-2  text-xl  text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/news"
                        >
                          Haberler
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          className="mx-2  text-xl  text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/academia"
                        >
                          Akademi
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          className="mx-2  text-xl  mr-10 text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/quiz"
                        >
                          Quiz
                        </NavLink>
                      </div>
                      {!user && (
                        <div className="flex  ">
                          <div className="hover:bg-gray-200 border p-3 px-4  rounded-lg mr-2 cursor-pointer">
                            <ModalLogin isOpen={true} />
                          </div>
                          <div className="hover:bg-gray-200 border p-3 px-4  rounded-lg cursor-pointer">
                            <ModalRegister isOpen={true} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" absolute inset-y-0 right-0 flex  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <select
                    value={currency}
                    className=" rounded-lg  p-2 border  outline-none"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value={"USD"}>USD</option>
                    <option value={"TRY"}>TRY</option>
                  </select>

                  {/* Profile dropdown */}
                  <Menu as="div" className=" relative ml-3 ">
                    <div>
                      <Menu.Button className="flex rounded-full text-sm ">
                        <span className="sr-only">Open user menu</span>
                        {!user.photoURL ? (
                          <div className="">
                            {" "}
                            <i className=" fa-regular fa-2x fa-user-circle"></i>
                          </div>
                        ) : (
                          <img
                            src={user.photoURL}
                            alt=""
                            width={45}
                            className="border p-1  rounded-full"
                          />
                        )}
                      </Menu.Button>
                    </div>
                    {user && (
                      <>
                        {" "}
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="text-left absolute right-0 z-10 mt-2 ml- w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <>
                                {user && (
                                  <>
                                    <span
                                      className="font-bold text-left block px-4 py-2  text-gray-700 hover:bg-gray-100"
                                      role="menuitem"
                                    >
                                      Kullanıcı <br />
                                      <span className="text-sm font-medium border rounded-lg bg-yellow-400 p-1">
                                        {user.email}
                                      </span>
                                    </span>
                                  </>
                                )}
                              </>
                            </Menu.Item>
                            <hr />
                            <Menu.Item>
                              <NavLink
                                to="/profile"
                                className="text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2  rounded-md text-base font-medium"
                              >
                                Profil
                              </NavLink>
                            </Menu.Item>
                            <Menu.Item>
                              <NavLink
                                to="/portfolyo"
                                className="text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                              >
                                Portfolyo
                              </NavLink>
                            </Menu.Item>
                            <Menu.Item>
                              <NavLink
                                to="/settings"
                                className="text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                              >
                                Ayarlar
                              </NavLink>
                            </Menu.Item>
                            {user && (
                              <Menu.Item>
                                <a
                                  onClick={logout}
                                  className=" text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                  Çıkış Yap
                                </a>
                              </Menu.Item>
                            )}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className=" lg:hidden w-full text-center ">
                <div className="space-y-1 px-2 pt-2 pb-3 ">
                  <Disclosure.Button
                    as={NavLink}
                    className="  text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    to="/"
                  >
                    Ana Sayfa
                  </Disclosure.Button>

                  <div>
                    <Disclosure.Button
                      as={NavLink}
                      className="  text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      to="/allcoins"
                    >
                      Piyasalar
                    </Disclosure.Button>
                  </div>

                  <div>
                    <Disclosure.Button
                      as={NavLink}
                      className="  text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      to="/news"
                    >
                      Haberler
                    </Disclosure.Button>
                  </div>
                  <div>
                    <Disclosure.Button
                      as={NavLink}
                      className=" text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium "
                      to="/exchanges"
                    >
                      Borsalar
                    </Disclosure.Button>
                  </div>
                  <div>
                    <Disclosure.Button
                      as={NavLink}
                      className=" text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      to="/academia"
                    >
                      Akademi
                    </Disclosure.Button>
                  </div>

                  <div>
                    <Disclosure.Button
                      as={NavLink}
                      className=" text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium "
                      to="/quiz"
                    >
                      Quiz
                    </Disclosure.Button>
                  </div>

                  {user && (
                    <>
                      <div>
                        <Disclosure.Button
                          as={NavLink}
                          className="  text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                          to="/portfolyo"
                        >
                          Portfolyo
                        </Disclosure.Button>
                      </div>
                    </>
                  )}

                  {!user && (
                    <div>
                      <div className=" hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-bold  ">
                        <Disclosure.Button as={ModalLogin}></Disclosure.Button>
                      </div>
                      <div className=" text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-bold ">
                        <Disclosure.Button
                          as={ModalRegister}
                        ></Disclosure.Button>
                      </div>
                    </div>
                  )}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default Header;
