import React from "react";
import { motion } from "framer-motion";
import myLogo from "../../../assets/img/pageLinks.svg";

function PageLinks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex justify-center my-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl flex flex-wrap md:flex-nowrap items-center">
        <motion.div className="" variants={itemVariants}>
          <img className="" width={"90%"} src={myLogo} alt="resim" />
        </motion.div>
        <motion.div className="ml-3 text-start" variants={itemVariants}>
          <div>
            <motion.h1
              className="font-bold sm:text-lg lg:text-xl xl:text-2xl text-md"
              variants={itemVariants}
            >
              Tüm Kriptolar Tek Yerde
            </motion.h1>
            <motion.p
              className="mb-1 sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm"
              variants={itemVariants}
            >
              200'den fazla Kripto parayı tek yerden inceleyin.
            </motion.p>
            <motion.a
              className="md:text-md lg:text-lg xl:text-xl text-sm text-blue-600"
              href="/markets"
              variants={itemVariants}
            >
              Kripto Paralar <i className="fa fa-arrow-right-long"></i>
            </motion.a>
          </div>
          <br />
          <br />
          <div className="">
            <motion.h1
              className="font-bold sm:text-lg lg:text-xl xl:text-2xl text-md"
              variants={itemVariants}
            >
              Kripto Piyasasını Takip Edin.
            </motion.h1>
            <motion.p
              className="mb-1 sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm"
              variants={itemVariants}
            >
              Tüm Kripto Haberlerini güncel olarak alın ve Kripto gelişmelerini
              takip edin.
            </motion.p>
            <motion.a
              className="md:text-md lg:text-lg xl:text-xl text-sm text-blue-600"
              href="/news"
              variants={itemVariants}
            >
              Haberler <i className="fa fa-arrow-right-long"></i>
            </motion.a>
          </div>
          <br />
          <br />
          <div>
            <motion.h1
              className="font-bold sm:text-lg lg:text-xl xl:text-2xl text-md"
              variants={itemVariants}
            >
              Size Uygun 100'den Fazla Borsayı İnceleyin
            </motion.h1>
            <motion.p
              className="mb-1 sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm"
              variants={itemVariants}
            >
              Alım-Satım yapacağınız borsayı seçin ve inceleyin.
            </motion.p>
            <motion.a
              className="md:text-md lg:text-lg xl:text-xl text-sm text-blue-600"
              href="/exchanges"
              variants={itemVariants}
            >
              Borsalar <i className="fa fa-arrow-right-long"></i>
            </motion.a>
          </div>
          <br />
          <br />
          <div>
            <motion.h1
              className="font-bold sm:text-lg lg:text-xl xl:text-2xl text-md"
              variants={itemVariants}
            >
              Blokzincir ve Kripto Akademisi
            </motion.h1>

            <motion.p
              className="mb-1 sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm"
              variants={itemVariants}
            >
              Blokzincir ve Kripto hakkında 10'larca Akademik bilgi burda.
            </motion.p>

            <motion.a
              className="md:text-md lg:text-lg xl:text-xl text-sm text-blue-600"
              href="/academia"
            >
              Akademi <i className="fa fa-arrow-right-long"></i>
            </motion.a>
          </div>
          <br />
          <br />
          <div className="">
            <motion.h1
              className="font-bold sm:text-lg lg:text-xl xl:text-2xl text-md"
              variants={itemVariants}
            >
              Quizlerle Öğrenin
            </motion.h1>

            <motion.p
              className="mb-1 sm:text-sm md:text-md lg:text-lg xl:text-xl text-sm"
              variants={itemVariants}
            >
              Quizlerle Blokzincir ve Kripto hakkında Temel Bilgileri test et.
            </motion.p>

            <motion.a
              className="md:text-md lg:text-lg xl:text-xl text-sm text-blue-600"
              href="/quiz"
            >
              Quiz <i className="fa fa-arrow-right-long"></i>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PageLinks;
