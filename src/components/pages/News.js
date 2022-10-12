import { useEffect, useState } from "react";
import axios from "axios";
import { LinearProgress } from "@mui/material";
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
      <h1 className="text-5xl">Haberler</h1>
      <div className=" ">
        <ul className="flex justify-center flex-wrap mt-5">
          {loading ? (
            <LinearProgress color="secondary" />
          ) : (
            news.map((item) => (
              <li className="" key={item.id}>
                <div className="news-box border m-3 p-3 w-80 text-left">
                  <div className="">
                    <img src={item.related_image_big} width="400" alt="resim" />
                    <div className="my-2">
                      <a
                        target="_blank"
                        href={item.third_party_url}
                        rel="noreferrer"
                      >
                        <h1 className="text-xl">{item.HEADLINE}</h1>
                      </a>
                    </div>
                    <hr />
                    <br />
                    <p>Haber Kaynağı : {item.news_provider_name}</p>
                    <a
                      target="_blank"
                      style={{ color: "red", textAlign: "right" }}
                      href={item.third_party_url}
                      rel="noreferrer"
                    >
                      Habere Git
                    </a>
                  </div>

                  <div></div>
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
