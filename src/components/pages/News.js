import { useEffect, useState } from "react";
import axios from "axios";
import NewsDesign from "../../utils/design/NewsDesign";
import LoadingIcon from "../../assets/icon/LoadingIcon";

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
        "X-RapidAPI-Key": process.env.REACT_APP_NEWS_API_KEY,
        "X-RapidAPI-Host": "investing-cryptocurrency-markets.p.rapidapi.com",
      },
    };

    await axios(options)
      .then(function (response) {
        setNews(response.data.data[0].screen_data.news);
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="news">
      <h1 className="my-10 xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-2xl  font-extrabold">
        Kriptoya Dair Haberler
      </h1>
      <div className=" ">
        {loading ? (
          <div role="status">
            <h1 className="my-2">Yükleniyor...</h1>
            <LoadingIcon/>
         
          </div>
        ) : (
          news.map((item) => (
            <>
              <NewsDesign news={item} />
            </>
          ))
        )}
      </div>
      {!loading ? (
        <div className=" flex justify-center items-center">
          <button
            disabled={page === 1}
            className="border border-gray-300 rounded-lg  p-3  mx-10 shadow-md hover:bg-gray-900 hover:text-white text-xs md:text-sm lg:text-md"
            onClick={() => setPage(page < 0 ? page : page - 1)}
          >
            <i className="fa-2 fa fa-arrow-left mr-2"></i> Önceki Sayfa
          </button>
          <span className="border w-10 h-9 py-1 shadow-md rounded-lg hover:bg-gray-700 hover:text-white">
            {page}
          </span>
          <button
            className="border border-gray-300 rounded-lg  p-3  mx-10 shadow-md hover:bg-gray-900 hover:text-white text-xs md:text-sm lg:text-md"
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
