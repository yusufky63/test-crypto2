import React from "react";

function NewsDesign({ news }) {
  return (
    <div>
      <div className="flex justify-center my-5">
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
              <h1 className="  lg:text-2xl md:text-xl sm:text-sm text-[14px]  font-bold tracking-tight text-gray-900 ">
                {news.HEADLINE}
              </h1>

              <div className="flex   justify-items-end">
                <div className=" mt-14 ">
                  <span className="md:text-lg sm:text-sm text-xs  text-gray-500">
                    {news.last_updated}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 text-xs md:text-sm lg:text-lg">
                  <a
                    target="_blank"
                    href={news.third_party_url}
                    className="flex items-center hover:bg-gray-300 p-2 border rounded-lg shadow-md "
                    rel="noreferrer"
                  >
                    Habere Git
                    <svg
                      aria-hidden="true"
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDesign;
