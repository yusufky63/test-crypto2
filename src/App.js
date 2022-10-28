import "./App.css";

import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import News from "./components/pages/News";
import Profile from "./components/pages/user/Profile";
import AllCoins from "./components/pages/AllCoins";
import CryptoCard from "./components/pages/CryptoCard";
import Header from "./components/Header";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Exchanges from "./components/pages/Exchanges";
import Academia from "./components/pages/Academia";
import Quiz from "./components/pages/Quiz";
import AllCoinsWidget from "./components/Widgets/AllCoinsWidget";
import Portfolyo from "./components/pages/user/Portfolyo";
import Settings from "./components/pages/user/Settings";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);

  const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    return !user ? <Navigate to="/" /> : children;
  };

  return (
    <div className="App ">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
      />
      <AllCoinsWidget></AllCoinsWidget>
      {/* <TickerWidget></TickerWidget> */}
      <Header></Header>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/allcoins" element={<AllCoins />} />
        <Route path="/allcoins/:id" element={<CryptoCard />} />
        <Route path="/news" element={<News />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/academia" element={<Academia />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              {" "}
              <Quiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/portfolyo"
          element={
            <PrivateRoute>
              <Portfolyo />
            </PrivateRoute>
          }
        />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
