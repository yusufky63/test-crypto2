/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import * as OTPAuth from "otpauth";
import { useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { onSnapshot } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import CloseIcon from "../../assets/icon/CloseIcon";
import { delete2FA } from "../../services/Firebase/FirebaseProfile";
import { encryptData, decryptData } from "../../utils/Auth2FA/Auth2FAUtils/LocalStorageEncryptAndDecrypt";

function Auth2FAModal({ isModalOpen, openModal, closeModal }) {
  const { user } = useSelector((state) => state.auth);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    if (isModalOpen) openModal();
  }, [isModalOpen]);

  const [otp, setOtp] = useState("");
  const [totps, setTotps] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [secretKey, setSecretKey] = useState();
  const [backupCode, setBackupCode] = useState();
  const [userBackupCode, setUserBackupCode] = useState("");
  const [showBackupCodeInput, setShowBackupCodeInput] = useState(false);
  let [isOpen, setIsOpen] = useState(true);

  const getSecureKeyAndBackupCode = async () => {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setSecretKey(doc.data().secretKey);
        setBackupCode(doc.data().backupCode);
      });
    });
  };

  let totp = useMemo(
    () =>
      new OTPAuth.TOTP({
        issuer: "CryptoXChain",
        label: `${user.email || user.displayName}`,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: secretKey,
      }),
    [secretKey, user]
  );

  useEffect(() => {
    getSecureKeyAndBackupCode();
    const intervalId = setInterval(() => {
      let token = totp.generate();
      let uri = totp.toString();

      setGeneratedCode(token);
      setTotps(OTPAuth.URI.parse(uri));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [totp]);

  function handleVerification(data) {
    const currentCode = totp.generate();

    if (data === currentCode || data === backupCode) {
      
      const ciphertextFromStorage = localStorage.getItem("auth2faCheck");
      let auth2faCheckData = decryptData(ciphertextFromStorage);

      if (!auth2faCheckData) {
        // 'auth2faCheck' verisi bulunamadı, yeni bir değer oluştur
        auth2faCheckData = {
          auth: false,
          status: "disabled",
        };
      } else {
        // Durumu güncelle
        auth2faCheckData.status = "disabled";
      }

      // Güncellenen veriyi şifrele ve LocalStorage'a geri kaydet
      const ciphertext = encryptData(auth2faCheckData);
      localStorage.setItem("auth2faCheck", ciphertext);


      toast.success("2FA Doğrulama Başarılı");
      delete2FA(user.uid);
      closeModal();
    } else {
      toast.error("Doğrulama Başarısız");
      reset();
    }
  }

  function reset() {
    setCode(["", "", "", "", "", ""]);
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    inputs[0].focus();
  }

  const handleInput = (index, e) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
    if (e.target.value !== "") {
      if (index < 5) {
        e.target.nextSibling.focus();
      } else {
        e.target.blur();
      }
    } else {
      if (index > 0) {
        e.target.previousSibling.focus();
      }
    }
    if (newCode.join("").length === 6) {
      handleVerification(newCode.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && e.target.value === "") {
      e.preventDefault();
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      if (index > 0) {
        e.target.previousSibling.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text/plain");
    if (/^[0-9]{6}$/.test(pastedData)) {
      setCode(pastedData.split(""));
    }
  };

  const handleCopy = (e) => {
    const codeStr = code.join("");
    e.clipboardData.setData("text/plain", codeStr);
    e.preventDefault();
  };

  const handlePasteButtonClick = () => {
    navigator.clipboard.readText().then((pastedData) => {
      if (/^[0-9]{6}$/.test(pastedData)) {
        setCode(pastedData.split(""));
        const codeArr = pastedData.split("");
        const codeStr = codeArr.join("");
        handleVerification(codeStr);
      }
    });
  };

  return (
    <div>
      <button
        className="border p-2 shadow-md rounded-md hover:bg-red-500 hover:text-white text-red-600"
        onClick={openModal}
      >
        Devre Dışı Bırak
      </button>
      <Transition appear show={isModalOpen} as={Fragment}>
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

                <h1 className="text-2xl text-center font-bold mb-2">
                  2FA Doğrulama
                </h1>
                <h1 className="text-sm text-center text-gray-500">
                  Authenticator uygulamasını açın Ardından 6 haneli kodu girin.
                </h1>

                <div className="bg-white  mx-auto max-w-xl text-center px-6 py-8">
                  <h2 className="text-lg  mb-2">6 Haneli Kodu Girin</h2>
                  <div className="flex justify-center items-center mb-4">
                    {code.map((otp, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-10 h-10 border  border-gray-300 text-center font-bold text-lg mr-2 focus:outline-none focus:border-blue-500"
                        value={otp}
                        onChange={(e) => handleInput(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onCopy={handleCopy}
                      />
                    ))}
                  </div>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={handlePasteButtonClick}
                  >
                    Kodu Yapıştır
                  </button>
                  <div className="flex justify-center items-center my-5">
                    <button
                      onClick={() => handleVerification(code)}
                      className=" w-full hover:bg-gray-300  text-gray-600 shadow-lg rounded-lg font-bold py-2 px-4  focus:outline-none focus:shadow-outline mr-4"
                    >
                      Onayla
                    </button>
                  </div>
                  <a
                    onClick={() => setShowBackupCodeInput(!showBackupCodeInput)}
                    href="#"
                    className="text-blue-500 text-sm  hover:underline"
                  >
                    Authenticator Koduna erişemiyorum
                  </a>
                  {showBackupCodeInput && (
                    <div>
                      <label className="block  text-sm mt-10 mb-2">
                        Yedek Kod
                      </label>
                      <div className="flex justify-center items-center">
                        <input
                          onChange={(e) => setUserBackupCode(e.target.value)}
                          value={userBackupCode}
                          className="border block p-2 outline-none shadow-sm rounded-lg w-2/3"
                        />
                        <button
                          onClick={() => handleVerification(userBackupCode)}
                          className=" px-5 hover:bg-gray-300  text-gray-600 shadow-lg rounded-lg font-bold py-2  focus:outline-none focus:shadow-outline mr-4"
                        >
                          Onayla
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Auth2FAModal;
