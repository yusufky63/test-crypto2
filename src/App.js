import "./style/App.css";
import "./style/statusStyle/status.css"
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import News from "./components/pages/News";
import Profile from "./components/pages/user/Profile";
import Markets from "./components/pages/Markets";
import CryptoCard from "./components/pages/CryptoDetail";
import Header from "./components/Header";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Exchanges from "./components/pages/Exchanges";
import Academia from "./components/pages/Academia";
import Quiz from "./components/pages/Quiz";
import AllCoinsWidget from "./components/utils/widgets/AllCoinsWidget";
import Portfolyo from "./components/pages/user/Portfolyo";
import Settings from "./components/pages/user/Settings";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import InternetConnection from "./components/utils/InternetConnection";
import Page404 from "./components/pages/Page404";
function App() {
  const { user } = useSelector((state) => state.auth);

  const PrivateRoute = ({ children }) => {
    return !user ? <Navigate to="/" /> : children;
  };

  return (
    <div className="App ">
      <ToastContainer
      className="mt-10"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
      />
      <InternetConnection />
      <AllCoinsWidget/>
      <Header/>
      <Routes>
        <Route end path="/" element={<Home />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/markets/:id" element={<CryptoCard />} />
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
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />{" "}
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Page404 to="/" />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
