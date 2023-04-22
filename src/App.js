import "./style/App.css";
import "./style/statusStyle/status.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

import AllCoinsWidget from "./utils/widgets/AllCoinsWidget";
import InternetConnection from "./utils/InternetConnection";
import IpLogger from "./utils/IpLogger";
import Router from "./Router";
function App() {
  return (
    <div className="App">
      <ToastContainer
        className="mt-10"
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
      />
 
      <IpLogger />
      <AllCoinsWidget />
      <InternetConnection />
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
