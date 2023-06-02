import React from "react";
import RightIcon from "../../assets/icon/RightIcon";
import { motion } from "framer-motion";

function NewsDesign({ news }) {

  return (
    <div>
      <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          
        
      className="flex justify-center my-5">
        <div className="container max-w-4xl  text-left border relative shadow-md rounded-md">
          <div className="flex p-2 relative ">
            <img
              className="rounded-lg max-w-xs  w-40 sm:w-60"
              src={news.related_image_big}
              alt=""
            />
            <div className=" text-left  ml-2 ">
              <span className="inline-block p-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded  md:text-xl sm:text-sm text-[12px]">
                {news.news_provider_name}
              </span>
              <h1 className="  lg:text-xl md:text-lg sm:text-sm text-[14px]  font-bold  text-gray-900 ">
                {news.HEADLINE}
              </h1>

              <div className="flex justify-items-end">
                <div className=" mt-16 ">
                  <span className="md:text-base sm:text-sm text-xs  text-gray-500">
                    {news.last_updated}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 text-xs md:text-sm lg:text-lg">
                  <a
                    target="_blank"
                    href={news.third_party_url}
                    className="flex items-center hover:bg-gray-300 p-2 border border-gray-100 rounded-lg  m-1  text-gray-900  shadow-lg  px-3"
                    rel="noreferrer"
                  >
                    Habere Git
                    <RightIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NewsDesign;
