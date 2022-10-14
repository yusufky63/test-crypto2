import "./App.css";

import Footer from "./footer";
import Home from "./components/pages/Home";
import News from "./components/pages/News";
import Profile from "./components/pages/Profile";
import AllCoins from "./components/pages/AllCoins";
import CryptoCard from "./components/pages/CryptoCard";
import Header from "./Header";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Exchanges from "./components/pages/Exchanges";
import Academia from "./components/pages/Academia";
import Quiz from "./components/pages/Quiz";
import AllCoinsWidget from "./components/Widgets/AllCoinsWidget";

function App() {
  return (
    <div className="App ">
      <AllCoinsWidget></AllCoinsWidget>
      {/* <TickerWidget></TickerWidget> */}
      <Header></Header>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/allcoins" element={<AllCoins />} />
        <Route path="/allcoins/:id" element={<CryptoCard />} />
        <Route path="/news" element={<News />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/academia" element={<Academia />} />
        <Route exact path="/exchanges" element={<Exchanges />} />
        <Route exact path="/quiz" element={<Quiz />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
