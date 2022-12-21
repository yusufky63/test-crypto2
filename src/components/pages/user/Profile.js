import { useState } from "react";
import { useSelector } from "react-redux";
import {
  upProfile,
  UpdatePassword,
  emailVerified,
} from "../../../services/firebase";
import DeleteAccount from "../../modal/DeleteAccount";
function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(user.displayName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);

  const handleUpdate = (e) => {
    e.preventDefault();
    upProfile(photoURL, displayName);
    if (password && password.length > 5) {
      UpdatePassword(password);
      setPassword("");
    }
  };
  const handleEmailVerified = (e) => {
    e.preventDefault();
    emailVerified();
  };

  return (
    <div className="flex justify-center">
      <div className="m-5">
        <div className="flex text-left p-2 border shadow-2xl rounded-lg m-10 ">
          <div className="p-5 ">
            {!user.emailVerified && (
              <div className="text-sm rounded-lg text-white flex justify-center mb-5 items-center bg-yellow-400 p-1">
                {" "}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>{" "}
                <span className="ml-2">
                  {" "}
                  Lütfen E-Mail Adresinizi Doğrulayın !
                </span>
              </div>
            )}
            <h1 className="text-2xl lg:text-3xl text-center  font-bold mx-14 p-1 drop-shadow-xl">
              Profil Güncelleme
            </h1>
            <div className="text-center my-5 ">
              {!user.photoURL ? (
                <div className="mb-3">
                  {" "}
                  <i className=" fa-regular fa-3x fa-user-circle"></i>
                </div>
              ) : (
                <div className=" flex justify-center">
                  <img
                    src={user.photoURL}
                    alt=""
                    width={55}
                    className="border rounded-full flex justify-center  my-5"
                  />
                </div>
              )}
              <input
                type="text"
                onChange={(e) => setPhotoURL(e.target.value)}
                value={photoURL}
                className="form-control
      block
      w-full
      px-5
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
                placeholder="Avatar Url"
              />{" "}
            </div>
            <br />
            <div>
              {" "}
              <h1>
                <span>Kullanıcı Adı </span>
                <input
                  type="text"
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                  className="form-control
      block
      w-full
      px-5
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
                  placeholder="Kullanıcı Adı"
                />{" "}
              </h1>
            </div>
            <div>
              {" "}
              <br />
              <h1>
                <span>Email </span>
                <input
                  readOnly
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="form-control
      block
      w-full
      px-5
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-gray-300 bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-gray-300  focus:outline-none"
                  placeholder="adresin@gmail.com"
                />
              </h1>
              {!user.emailVerified ? (
                <div className="flex justify-end">
                  {" "}
                  <button
                    onClick={handleEmailVerified}
                    className=" border p-2 mt-1 shadow-md rounded-lg hover:bg-gray-200 text-yellow-500"
                  >
                    Emaili Doğrula
                  </button>
                </div>
              ) : (
                <div className="flex justify-end">
                  {" "}
                  <span className="border p-2 mt-1 shadow-md rounded-lg text-green-500">
                    Email Doğrulandı
                  </span>
                </div>
              )}
            </div>
            <br />
            <div>
              {" "}
              <h1>
                <span>Şifre </span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className="form-control
      block
      w-full
      px-5
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
                  placeholder="En Az 6 Karakter"
                />
              </h1>
            </div>
            {/* <div>
            {" "}
            <h1>
              <span>Şifre Tekrar :</span>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                 
                placeholder="adresin@gmail.com"
              />
            </h1>
          </div> */}
            <br />
            <div className="flex justify-between mt-5">
              <button
                onClick={handleUpdate}
                className="border text-blue-700 shadow-md rounded-lg hover:bg-blue-200 p-3 px-8"
              >
                Güncelle
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="border shadow-md rounded-lg text-red-600 hover:bg-red-200 p-3 px-8"
              >
                <DeleteAccount />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
