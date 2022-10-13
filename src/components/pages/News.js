import { useEffect, useState } from "react";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import parse from 'html-react-parser';
function News() {
  const [page, setPage] = useState(1);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
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
        "X-RapidAPI-Key": "448c5e48f7msh9728769d4d23a16p1c72f3jsndb048d269553",
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
    setLoading(true);
    fetchNews();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  console.log(news);
  return (
    <div className="mt-10 ">
      <h1 className="text-5xl font-bold">Kriptoya Dair Haberler</h1>
      <div className=" ">
        <ul className="flex justify-center flex-wrap mt-5">
          {loading ? (
            <LinearProgress color="secondary" />
          ) : (
            news.map((item) => (
              <li className="text-left" key={item.id}>
                <div className="m-5 p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md  text-gray-700 ">
                  <img
                    class="rounded-t-lg"
                    src={item.related_image_big}
                    alt=""
                  />
                 <div className="p-3">
                 <span class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded">{item.news_provider_name}</span>
                 </div>
                  <div className="p-3">
                    
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {item.HEADLINE}
                    </h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {parse(item.BODY)}
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
                        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" rel="noreferrer"
                      >
                        Habere Git
                        <svg
                          aria-hidden="true"
                          class="ml-2 -mr-1 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
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

      <hr />
      <br />
      <div className=" flex justify-center items-center">
        {" "}
        <button
          className="border-gray-600  border p-2 font-medium mx-10  hover:bg-gray-900 hover:text-white"
          onClick={() => setPage(page < 0 ? page : page - 1)}
        >
          {" "}
          <i className="fa-2 fa fa-arrow-left mr-2"></i> Önceki Sayfa
        </button>
        <span className="border w-10 h-9 py-1 rounded-full hover:bg-gray-700 hover:text-white">
          {page}
        </span>
        <button
          className="border-gray-600 border p-2 font-medium mx-10 hover:bg-gray-900 hover:text-white"
          onClick={() => setPage(page + 1)}
        >
          Sonraki Sayfa <i className="fa-2 fa fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
}

export default News;
