/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import * as OTPAuth from "otpauth";
import { useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { onSnapshot } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";

function Auth2FAChecker() {
  const urlParams = new URLSearchParams(window.location.search);
  const user = Object.fromEntries(urlParams.entries());
  const uid = Object.keys(user)[0];
  console.log(uid);

  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const [totps, setTotps] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [secretKey, setSecretKey] = useState();
  const [backupCode, setBackupCode] = useState();
  const [userBackupCode, setUserBackupCode] = useState("");
  const [showBackupCodeInput, setShowBackupCodeInput] = useState(false);

  const getSecureKeyAndBackupCode = async () => {
    const q = query(collection(db, "users"), where("uid", "==", uid));
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

        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: secretKey,
      }),
    [secretKey, uid]
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
      const auth2faCheckData = JSON.parse(localStorage.getItem("auth2faCheck"));
      if (auth2faCheckData) {
        // Durumu güncelle
        auth2faCheckData.status = "verified";

        // Güncellenen veriyi LocalStorage'a geri kaydet
        localStorage.setItem("auth2faCheck", JSON.stringify(auth2faCheckData));

        // Güncelleme tamamlandı, diğer işlemleri gerçekleştir
      } else
        localStorage.setItem(
          "auth2faCheck",
          JSON.stringify({ auth: true, status: "verified" })
        );

      toast.success("2FA Doğrulama Başarılı");
      window.location = "/";
    } else {
      toast.error("Doğrulama Başarısız");
    }
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
    <div className="mt-10">
      <h1 className="text-3xl text-center font-bold mb-2">2FA Doğrulama</h1>
      <h1 className=" text-center text-gray-500">
        Authenticator uygulamasını açın Ardından 6 haneli kodu girin.
      </h1>

      <div className="bg-white  mx-auto max-w-xl text-center px-6 py-8">
        <h2 className="text-lg  mb-2">6 Haneli Kodu Girin</h2>
        <div className="flex justify-center items-center mb-4">
          {code.map((otp, index) => (
            <input
              key={index}
              autoFocus={index === 0}
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
          className="text-blue-500 hover:underline mb-10"
          onClick={handlePasteButtonClick}
        >
          Kodu Yapıştır
        </button>
        <div className="flex justify-center items-center my-5">
          <button
            onClick={() => handleVerification(code)}
            className=" px-10 hover:bg-gray-300  text-gray-600 shadow-lg rounded-lg font-bold py-2  focus:outline-none focus:shadow-outline mr-4"
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
            <label className="block  text-sm mt-10 mb-2">Yedek Kod</label>
            <div className="flex justify-center items-center">
              <input
                onChange={(e) => setUserBackupCode(e.target.value)}
                value={userBackupCode}
                className="border block p-2 outline-none shadow-sm rounded-lg w-1/3"
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
  );
}

export default Auth2FAChecker;
