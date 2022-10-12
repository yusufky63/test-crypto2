


import { Link } from "react-router-dom";
import { CryptoState } from "./components/context/CryptoContext";

function Header() {
  const { currency, setCurrency } = CryptoState();

  return (
    <>
      <nav className="flex justify-center">
        <div className="navbar border rounded-full w-4/6 flex text-xl justify-between p-4 px-5 items-center">
          <div>
            <Link to="/">Ana Sayfa</Link>
          </div>
          <div>
            <Link to="/allcoins">Coinler</Link>
          </div>
          <div>
            <img src={require("./img/logo.png")} width="100" alt="resim" />
          </div>
          <div>
            <Link to="/news">Haberler</Link>
          </div>
          <div>
            <Link to="/profile">Profile</Link>
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
      </nav>
    </>
  );
}

export default Header;
