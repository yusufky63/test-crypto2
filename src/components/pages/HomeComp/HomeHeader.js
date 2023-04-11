import { motion } from "framer-motion";

export default function HomeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center bg-home-header"
    >
      <div className="max-w-7xl container ">
         
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-bold lg:text-3xl xl:text-5xl text-2xl my-16"
        >
          Kripto Dünyasına Hoşgeldiniz
        </motion.h1>
        <div className=" flex sm:flex-row flex-col justify-around items-center  mb-14  ">
          <div className=" font-bold text-start  ">
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="md:text-xl lg:text-2xl xl:text-4xl text-lg mb-2"
            >
              Kripto Alıp - Satmanın dünyadaki <br />
              en popüler yeri
              <br />
            </motion.h1>

            <motion.p
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-600  mt-1  md:text-lg lg:text-xl xl:text-2xl text-md sm:whitespace-pre-wrap"
            >
              2011'den beri milyonlarca insanın güveni ile <br />
              değeri 1 Trilyon doları aşan kripto para işlemleri.
            </motion.p>
          </div>

          <motion.img
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 sm:mt-0 "
            width={"35%"}
            src={require("../../../assets/img/svg-1.png")}
            alt="resim"
          />
        </div>
      </div>
    </motion.div>
  );
}
