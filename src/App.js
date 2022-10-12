import "./App.css";
import TickerWidget from "./components/Widgets/TickerWidget";
import Footer from "./footer";
import Home from "./components/pages/Home";
import News from "./components/pages/News";
import Profile from "./components/pages/Profile";
import AllCoins from "./components/pages/AllCoins";
import CryptoCard from "./components/pages/CryptoCard";
import Header from "./Header";
import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <TickerWidget></TickerWidget> */}
      <Header></Header>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/allcoins" element={<AllCoins />} />
        <Route path="/allcoins/:id" element={<CryptoCard />} />
        <Route path="/news" element={<News />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
