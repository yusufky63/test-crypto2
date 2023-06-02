import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import quizIcon from "../../assets/img/blockchain.png";
import { useSelector } from "react-redux";
import { ModalLogin, ModalRegister } from "../modal";
import { getScoreTop3 } from "../../services/Firebase/FirebaseQuestion";
const Quiz = () => {
  const medals = ["🥇", "🥈", "🥉"];

  const [topScore, setTopScore] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
  };

  useEffect(() => {
    getScoreTop3()
      .then((res) => {
        res.sort((a, b) => {
          if (a.score > b.score) {
            return -1;
          } else if (b.score > a.score) {
            return 1;
          } else {
            return 0;
          }
        });

        setTopScore(res.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div className="flex flex-col-reverse md:flex-col">
      {topScore && (
        <motion.div
          className="md:mt-5  flex flex-col justify-center items-center px-4 py-2 sm:px-6 lg:px-8  lg:absolute "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-center text-lg font-bold text-gray-900">
            Skor Tablosu
          </h2>
          <ul className="mt-4 space-y-4 w-full">
            {topScore.map((result, index) => (
              <motion.li
                key={result.id}
                className="flex items-center text-sm flex-row justify-between px-4 py-2 border border-transparent rounded-md shadow-md font-medium text-gray-900 bg-gray-100"
                initial={{ opacity: 0, y: 20 * index }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="mr-2 text-xl">{medals[index]}</span>
                <span className="mr-2 ">{result.email}</span>
                <span className="flex justify-center shadow-lg rounded-lg w-8 border bg-gray-300  p-1">
                  {result.score}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
      {user ? (
        <motion.div
          className="mt-20 flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8"
          initial="initial"
          animate="animate"
          variants={variants}
        >
          <motion.div
            className="max-w-md w-full space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 1 },
            }}
          >
            <img
              src={quizIcon}
              alt="Quiz icon"
              className="h-32 w-32 mx-auto text-green-600"
            />
            <motion.h2
              className="text-center text-3xl font-extrabold text-gray-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.8, duration: 1 },
              }}
            >
              Kripto ve Blockchain Quiz'ine Hoş Geldiniz!
            </motion.h2>
            <motion.p
              className="text-center text-lg text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
            >
              Quiz'te, kripto para birimleri ve blockchain teknolojisi hakkında
              sorular yer almaktadır.
            </motion.p>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.2, duration: 1 } }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Link to="/quiz/question">Quiz Başlat</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="mt-20 flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8"
          initial="initial"
          animate="animate"
          variants={variants}
        >
          <motion.div
            className="max-w-md w-full space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 1 },
            }}
          >
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
              Quiz'e erişim için Lütfen Giriş Yapınız!
            </h1>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.2, duration: 1 } }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" flex items-center justify-between px-4 py-2 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-green-600 hover:bg-white hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ModalLogin>Giriş Yap</ModalLogin>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" flex items-center justify-between px-4 py-2 border border-transparent rounded-md shadow-md text-base font-medium text-green-600 bg-white hover:text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ModalRegister>Kayıt Ol</ModalRegister>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
