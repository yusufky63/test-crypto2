/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {toast} from "react-toastify";
import QRCode from "qrcode.react";

export function Auth2FAStep4({backupCode}) {
  const copyToClipboard = () => {
    toast.success("Yedek anahtarınız panoya kopyalandı.");
    navigator.clipboard.writeText(backupCode);
  };

  return (
    <div className="bg-white rounded-lg  mx-auto max-w-md px-6 py-8">
      <h2 className="text-lg font-bold mb-2">Adım 4: Yedek Anahtar</h2>
      <p className="text-gray-600 mb-4">
        Lütfen yedek anahtarınızı güvenli bir yerde saklayın. Bu anahtar,
        cihazınız kaybolduğunda veya doğrulama kodu alamadığınızda hesabınıza
        erişmek için kullanılabilir.
      </p>
      <div className="flex flex-col items-center justify-center mb-4">
        <QRCode
          className="shadow-lg p-3 rounded-lg"
          value={backupCode}
          size={256}
        />

        <div className="mt-4">
          <p className="text-gray-600 text-lg font-bold">Yedek Anahtarınız</p>
          <a
            href="#"
            onClick={copyToClipboard}
            className="block cursor-pointer text-gray-100 rounded-lg p-2 border px-4 bg-gray-500 font-mono text-lg font-bold mb-4"
          >
            {backupCode}
          </a>

          <p className="text-sm text-red-600">
            Yedek anahtarınızı güvenli bir yerde saklayın ve asla başka
            kişilerle paylaşmayın.
          </p>
        </div>
      </div>
    </div>
  );
}
