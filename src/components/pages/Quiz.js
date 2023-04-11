import React from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import quizIcon from "../../assets/img/blockchain.png";
import {useSelector} from "react-redux";
import {ModalLogin, ModalRegister} from "../modal";

const Quiz = () => {
  const {user} = useSelector((state) => state.auth);
  const variants = {
    initial: {opacity: 0},
    animate: {opacity: 1, transition: {duration: 1}},
  };

  return (
    <>
      {user ? (
        <motion.div
          className="mt-20 flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8"
          initial="initial"
          animate="animate"
          variants={variants}
        >
          <motion.div
            className="max-w-md w-full space-y-8"
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0, transition: {delay: 0.5, duration: 1}}}
          >
            <img
              src={quizIcon}
              alt="Quiz icon"
              className="h-32 w-32 mx-auto text-green-600"
            />
            <motion.h2
              className="text-center text-3xl font-extrabold text-gray-900"
              initial={{opacity: 0, y: -20}}
              animate={{
                opacity: 1,
                y: 0,
                transition: {delay: 0.8, duration: 1},
              }}
            >
              Kripto ve Blockchain Quiz'ine Hoş Geldiniz!
            </motion.h2>
            <motion.p
              className="text-center text-lg text-gray-500"
              initial={{opacity: 0}}
              animate={{opacity: 1, transition: {delay: 1, duration: 1}}}
            >
              Quiz'te, kripto para birimleri ve blockchain teknolojisi hakkında
              sorular yer almaktadır.
            </motion.p>
            <motion.div
              className="space-y-4"
              initial={{opacity: 0}}
              animate={{opacity: 1, transition: {delay: 1.2, duration: 1}}}
            >
              <motion.div
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Link to="/quiz/question">Quiz Başlat</Link>
              </motion.div>
              {/* <motion.div
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-green-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {user.email === "codexsha@gmail.com" && (
                  <Link to="/quiz/create-question">
                    Soru Ekle (Yalnızca yönetici kullanıcılar)
                  </Link>
                )}
              </motion.div> */}
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
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0, transition: {delay: 0.5, duration: 1}}}
          >
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
              Quiz'e erişim için Lütfen Giriş Yapınız!
            </h1>
            <motion.div
              className="space-y-4"
              initial={{opacity: 0}}
              animate={{opacity: 1, transition: {delay: 1.2, duration: 1}}}
            >
              <motion.div
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                className=" flex items-center justify-between px-4 py-2 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-green-600 hover:bg-white hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ModalLogin>Giriş Yap</ModalLogin>
              </motion.div>
              <motion.div
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                className=" flex items-center justify-between px-4 py-2 border border-transparent rounded-md shadow-md text-base font-medium text-green-600 bg-white hover:text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ModalRegister>Kayıt Ol</ModalRegister>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Quiz;
