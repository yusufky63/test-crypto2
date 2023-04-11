/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";

import {Fragment} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {NavLink} from "react-router-dom";
import {CryptoState} from "./redux/CryptoContext";
import ModalLogin from "./modal/ModalLogin";
import ModalRegister from "./modal/ModalRegister";
import {logout} from "../services/firebase";
import {useSelector} from "react-redux";
function Header() {
  const {currency, setCurrency} = CryptoState();

  const {admins} = useSelector((state) => state.admins);
  const {user} = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
  if (user) {
    const admin = admins.find((admin) => admin.id === user.uid);
    setIsAdmin(admin);
  }
  }, [user, admins]);
  return (
    <>
      <Disclosure as="nav" className="bg-white navbar ">
        {({open}) => (
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
                        <NavLink
                          end
                          style={({isActive}) => ({
                            textDecoration: isActive ? "underline 4px" : "none",
                            textUnderlineOffset: isActive ? "8px" : "none",
                          })}
                          className="mx-2 text-lg text-black  hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md  "
                          to="/"
                        >
                          Ana Sayfa
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          style={({isActive}) => ({
                            textDecoration: isActive ? "underline 4px" : "none",
                            textUnderlineOffset: isActive ? "8px" : "none",
                          })}
                          className="mx-2  text-lg  text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/markets"
                        >
                          Piyasalar
                        </NavLink>
                      </div>
                      <div>
                        <NavLink
                          style={({isActive}) => ({
                            textDecoration: isActive ? "underline 4px" : "gray",
                            textUnderlineOffset: isActive ? "8px" : "gray",
                          })}
                          className="mx-2  text-lg  text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/exchanges"
                        >
                          Borsalar
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          style={({isActive}) => ({
                            textDecoration: isActive ? "underline 4px" : "gray",
                            textUnderlineOffset: isActive ? "8px" : "gray",
                          })}
                          className="mx-2  text-lg  text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/news"
                        >
                          Haberler
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          style={({isActive}) => ({
                            textDecoration: isActive ? "underline 4px" : "gray",
                            textUnderlineOffset: isActive ? "8px" : "gray",
                          })}
                          className="mx-2  text-lg  text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/academia"
                        >
                          Akademi
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          style={({isActive}) => ({
                            textDecoration: isActive ? "underline 4px" : "gray",
                            textUnderlineOffset: isActive ? "8px" : "gray",
                          })}
                          className="mx-2  text-lg  mr-10 text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
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

                { isAdmin && (
                  <div className=" absolute inset-y-0 right-36 flex  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 shadow-sm border-black rounded ">
                    <NavLink
                      style={({isActive}) => ({
                        textDecoration: isActive ? "underline 4px" : "none",
                        textUnderlineOffset: isActive ? "8px" : "none",
                      })}
                      className="mx-2  text-lg  text-black hover:bg-gray-900 hover:text-white  px-3 py-2 rounded-md "
                      to="/admin"
                    >
                      Admin
                    </NavLink>
                  </div>
                )}

                <div className=" absolute inset-y-0 right-0 flex  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <select
                    value={currency}
                    className=" rounded-lg  p-2 border  outline-none"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value={"TRY"}>TRY</option>
                    <option value={"USD"}>USD</option>
                  </select>

                  <Menu as="div" className=" relative ml-3 ">
                    <div>
                      <Menu.Button className="flex rounded-full text-sm ">
                        <span className="sr-only">Open user menu</span>
                        {!user.photoURL ? (
                          <div className="">
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
                        {!user.emailVerified && user && (
                          <span className="status idle"></span>
                        )}
                      </Menu.Button>
                    </div>
                    {user && (
                      <>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="text-left absolute right-0 z-50 mt-2 ml- w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                className="relative items-center text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2  rounded-md text-base font-medium"
                              >
                                Profil
                                {!user.emailVerified ? (
                                  <span className="left-10  status idle"></span>
                                ) : (
                                  <span className="absolute right-3 top-1.5 bg-green-400 text-white text-xs p-1 px-2 rounded-md ">
                                    <span className="flex justify-between items-center">
                                      <svg
                                        className="w-5 h-5 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                        ></path>
                                      </svg>
                                      <span> Onaylı</span>
                                    </span>
                                  </span>
                                )}
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
                      to="/markets"
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
