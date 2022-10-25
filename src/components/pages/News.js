import { useEffect, useState } from "react";
import axios from "axios";

// import parse from "html-react-parser";
function News() {
  const [page, setPage] = useState(1);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news",
      params: {
        pair_ID: "1057391",
        page: page,
        time_utc_offset: "28800",
        lang_ID: "10",
      },
      headers: {
        "X-RapidAPI-Key": "889a157c0amshd3719aa86b5831fp1a003cjsn2463be379936",
        "X-RapidAPI-Host": "investing-cryptocurrency-markets.p.rapidapi.com",
      },
    };

    await axios(options)
      .then(function (response) {
        setNews(response.data.data[0].screen_data.news);
      })
      .catch(function (error) {
        console.error(error);
      });

    setLoading(false);
  };
  useEffect(() => {
    fetchNews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  console.log(news);
  return (
    <div className="my-10 ">
      <h1 className=" xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-2xl  font-bold">
        Kriptoya Dair Haberler
      </h1>
      <div className=" ">
        <ul className="flex justify-center flex-wrap mt-5">
          {loading ? (
            <div role="status">
              <h1 className="my-2">Yükleniyor...</h1>
              <svg
                className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            news.map((item) => (
              <li className="text-left" key={item.id}>
                <div className="m-5 p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md  text-gray-700 ">
                  <img
                    className="rounded-t-lg"
                    src={item.related_image_big}
                    alt=""
                  />
                  <div className="p-3">
                    <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded">
                      {item.news_provider_name}
                    </span>
                  </div>
                  <div className="p-3">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {item.HEADLINE}
                    </h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {/* {(parse(item.BODY))} */}
                    </p>
                    <br />
                    <div className="flex justify-between ">
                      <div>
                        <p>Güncelleme Tarihi </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          {item.last_updated}
                        </p>
                      </div>
                      <a
                        target="_blank"
                        href={item.third_party_url}
                        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              </li>
            ))
          )}
        </ul>
      </div>
      {!loading ? (
        <div className=" flex justify-center items-center">
          {" "}
          <button
            disabled={page === 1}
            className="border border-gray-300 rounded-full  p-3 font-medium mx-10  hover:bg-gray-900 hover:text-white"
            onClick={() => setPage(page < 0 ? page : page - 1)}
          >
            {" "}
            <i className="fa-2 fa fa-arrow-left mr-2"></i> Önceki Sayfa
          </button>
          <span className="border w-10 h-9 py-1 rounded-full hover:bg-gray-700 hover:text-white">
            {page}
          </span>
          <button
            className="border border-gray-300 rounded-full  p-3 font-medium mx-10 hover:bg-gray-900 hover:text-white"
            onClick={() => setPage(page + 1)}
          >
            Sonraki Sayfa <i className="fa-2 fa fa-arrow-right ml-2"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default News;
