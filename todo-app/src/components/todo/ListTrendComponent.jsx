import { useState, useEffect } from "react";
import { retrieveTodayAllTrendsApi } from "./api/TrendApiService";

export function ListTrendsComponent() {
  const [trends, setTrends] = useState([]);
  const [hoveredArticleId, setHoveredArticleId] = useState(null);

  useEffect(() => {
    refreshTrends();
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  function refreshTrends() {
    retrieveTodayAllTrendsApi(formattedDate)
      .then((response) => {
        setTrends(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      <h1 style={{ fontWeight: "bold" }}>급 상승 인기 검색어</h1>
      <h2>
        <th>{formattedDate}</th>
      </h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th style={{ textAlign: "center" }}>Keyword</th>
              <th style={{ textAlign: "center" }}>Article</th>
              <th style={{ textAlign: "center" }}>Ago</th>
              <th style={{ textAlign: "center" }}>Volume</th>
            </tr>
          </thead>
          <tbody>
            {trends.length > 0 ? (
              trends.map((trend, index) => (
                <tr
                  key={trend.id}
                  onMouseEnter={() => setHoveredArticleId(trend.id)}
                  onMouseLeave={() => setHoveredArticleId(null)}
                  style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "" }}
                >
                  <td style={{ verticalAlign: "middle" }}>
                    <a
                      href={trend.articleLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {trend.imgLink !== "noimg" ? (
                        <img
                          src={trend.imgLink}
                          alt="Article Thumbnail"
                          style={{ borderRadius: "8px" }} // 이미지 모서리를 둥글게 설정
                        />
                      ) : (
                        "기사보기"
                      )}
                    </a>
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {trend.keyword}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <a
                      href={trend.articleLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: hoveredArticleId === trend.id ? "blue" : "black",
                        textDecoration: "none", // 밑줄 없애기
                        fontFamily: "Arial, sans-serif", // 폰트 설정
                      }}
                    >
                      {trend.article}
                    </a>
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {trend.agoTime}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {trend.volume}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  No trends available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
