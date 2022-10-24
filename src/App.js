import "./App.css";

import Footer from "./components/pages/Footer";
import Home from "./components/pages/Home";
import News from "./components/pages/News";
import Profile from "./components/pages/Profile";
import AllCoins from "./components/pages/AllCoins";
import CryptoCard from "./components/pages/CryptoCard";
import Header from "./components/pages/Header";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Exchanges from "./components/pages/Exchanges";
import Academia from "./components/pages/Academia";
import Quiz from "./components/pages/Quiz";
import AllCoinsWidget from "./components/Widgets/AllCoinsWidget";
import Portfolyo from "./components/pages/Portfolyo";
import Settings from "./components/pages/Settings";
// import  'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App ">
      <ToastContainer
        position="top-right"
        autoClose={700}
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/academia" element={<Academia />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/portfolyo" element={<Portfolyo />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
