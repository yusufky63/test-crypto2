import React, {useState} from "react";

export function Auth2FAStep3({handleVerification}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

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
    <div className="flex justify-center text-center">
      <div className=" max-w-6xl mt-8 text-sm lg:text-base">
        <h2 className="text-lg font-bold mb-2">Adım 3: Doğrulayın</h2>
        <div className="bg-white  mx-auto max-w-xl px-6 py-8">
          <h2 className="text-lg font-bold mb-2">6 Haneli Kodu Girin</h2>
          <div className="flex justify-center items-center mb-4">
            {code.map((otp, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-10 h-10 border border-gray-300 text-center font-bold text-lg mr-2 focus:outline-none focus:border-blue-500"
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
          <div className="flex justify-center items-center mt-10">
            <button
              onClick={() => handleVerification(code)}
              className=" w-full hover:bg-gray-300  text-gray-600 shadow-lg rounded-lg font-bold py-2 px-4  focus:outline-none focus:shadow-outline mr-4"
            >
              Onayla
            </button>
          </div>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  );
}
