/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { CryptoState } from "./components/context/CryptoContext";

function Header() {
  const { currency, setCurrency } = CryptoState();

  return (
    <>
      {/* <nav className="flex justify-center">
        <div className="navbar border rounded-full w-4/6 flex text-xl justify-between p-4 px-5 items-center">
          <div>
            <NavLink to="/">Ana Sayfa</NavLink>
          </div>
          <div>
            <NavLink to="/allcoins">Coinler</NavLink>
          </div>
          <div>
            <img src={require("./img/logo.png")} width="100" alt="resim" />
          </div>
          <div>
            <NavLink to="/news">Haberler</NavLink>
          </div>
          <div>
            <NavLink to="/profile">Profile</NavLink>
          </div>
          <div className="absolute right-10">
            <select
              value={currency}
              className="bg-gray-200 rounded-full p-2 border-sm"
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value={"USD"}>USD</option>
              <option value={"TRY"}>TRY</option>
            </select>
          </div>
        </div>
      </nav> */}

      <Disclosure as="nav" className="bg-white navbar ">
        {({ open }) => (
          <>
            <div className="mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8 ">
              <div className="relative flex h-24 items-center justify-between">
                <div className="absolute  inset-y-0 left-0 flex items-center sm:hidden ">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className=" flex flex-1 items-center justify-center sm:items-stretch ">
                  <div className="flex  flex-shrink-0 items-center ">
                    {/* <img
                      className="block  h-16 w-16 lg:hidden "
                      src="https://www.citypng.com/public/uploads/preview/-51614811467slofjndnl0.png"
                      alt=" Crypto"
                    /> */}
                  </div>
                  <div className="hidden sm:ml-6 sm:block ">
                    <div className="flex space-x-4  justify-center items-center">
                      <div>
                        {" "}
                        <NavLink
                          className="mx-2 text-xl text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md  "
                          to="/"
                        >
                          AnaSayfa
                        </NavLink>
                      </div>

                      <div>
                        <NavLink
                          className="mx-2  text-xl  text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/allcoins"
                        >
                          Coinler
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
                          className="mx-2  text-xl  text-black hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md "
                          to="/quiz"
                        >
                          Quiz
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <select
                    value={currency}
                    className=" rounded-full  p-2 border  outline-none"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value={"USD"}>USD</option>
                    <option value={"TRY"}>TRY</option>
                  </select>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <a className="  text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Profil
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a className="  text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Ayarlar
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a className="  text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Çıkış Yap
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
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
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
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
                      Coinler
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

                  <div>
                    <Disclosure.Button
                      as={NavLink}
                      className="  text-black-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      to="/profile"
                    >
                      Profile
                    </Disclosure.Button>
                  </div>
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
