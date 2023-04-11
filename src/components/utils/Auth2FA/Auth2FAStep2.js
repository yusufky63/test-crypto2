/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import QRCode from "qrcode.react";
import {toast} from "react-toastify";

export function Auth2FAStep2({totps, secretKey}) {
  const copyToClipboard = () => {
    toast.success("Metin panoya kopyalandı!");
    navigator.clipboard.writeText(secretKey);
  };

  return (
    <div className="flex justify-center text-center">
      <div className=" max-w-6xl mt-8 text-sm lg:text-base">
        <h2 className=" text-lg font-bold mb-2">Adım 2: Kimlik Doğrulama</h2>
        <div className="flex flex-row-reverse p-5 items-center">
          <div className="mx-5 lg:block hidden">
            <img
              alt="otp"
              className="w-48"
              src={require("../../../assets/img/otp.jpg")}
            />
          </div>
          <div>
            <p className="text-gray-600 mb-4">
              Lütfen aşağıdaki QR kodunu okutun ve aşağıdaki metni doğrulama
              uygulamasına girin.
            </p>
            <div className="flex justify-center items-center mb-4">
              {totps ? (
                <QRCode
                  value={totps}
                  size={240}
                  className="p-4 border rounded-lg bg-white shadow-lg"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex justify-center items-center">
                  <span className="text-gray-400">QR Kodu Yükleniyor...</span>
                </div>
              )}
            </div>
            <div className="text-gray-600 mb-4 flex flex-col">
              <span>
                Eğer QR kodu taratamıyorsanız, lütfen bu kodu uygulamaya manuel
                olarak girin.
              </span>
              <a
                href="#"
                onClick={copyToClipboard}
                className="block cursor-pointer text-gray-100 rounded-lg p-2 border px-4 bg-gray-500 font-mono text-lg font-bold mb-4"
              >
                {secretKey}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
