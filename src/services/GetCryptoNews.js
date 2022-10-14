import { useState } from "react";
import axios from "axios";
function GetCryptoNews() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [stop, setStop] = useState(false);
  const data = [{}];

  if (stop === false) {
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
        "X-RapidAPI-Key": "a75319eeafmsh2244a4a6651e235p1fb377jsn1f3b67f45f77",
        "X-RapidAPI-Host": "investing-cryptocurrency-markets.p.rapidapi.com",
      },
    };

    axios(options)
      .then(function (response) {
        setPage(response.data.data[0].screen_data.next_page);
        setNews(response.data.data[0].screen_data.news);
        data.push(...response.data.data[0].screen_data.news);
        console.log(news, response.data.data[0].screen_data.news);
        if (page === 4) setStop(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  console.log("array", data);

  return (
    <div>
      <ul className="flex justify-center flex-wrap flex-col-5 ">
        {news.map((item) => (
          <li key={item.id}>
            <div className="news-box border m-3 p-3 w-80 text-left">
              <div className="">
                <img src={item.related_image_big} width="400" alt="resim" />
                <div className="my-2">
                  <a target="_blank" href={item.news_link} rel="noreferrer">
                    <h1 className="text-xl">{item.HEADLINE}</h1>
                  </a>
                </div>
                <hr />
                <br />
                <p>Haber Kaynağı : {item.news_provider_name}</p>
                <a
                  target="_blank"
                  style={{ color: "red", textAlign: "right" }}
                  href={item.news_link}
                  rel="noreferrer"
                >
                  Habere Git
                </a>
              </div>

              <div></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetCryptoNews;
