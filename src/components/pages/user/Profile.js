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
      <div>
        <div className="flex text-left p-2 border shadow-2xl rounded-lg m-10 ">
          <div className="p-10 ">
            <h1 className="text-3xl text-center  font-bold mx-14 p-1 drop-shadow-xl">
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
                placeholder="Resim Url"
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
              {!user.emailVerified ? (
                <button
                  onClick={handleEmailVerified}
                  className="border p-2 mt-1 text-red-500"
                >
                  Emaili Doğrula
                </button>
              ) : (
                <span className="text-green-500">Email Doğrulandı</span>
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
                  placeholder="Şifren"
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
                className="border text-blue-700 rounded-lg hover:bg-blue-200 p-3 px-8"
              >
                Güncelle
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="border rounded-lg text-red-600 hover:bg-red-200 p-3 px-8"
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
