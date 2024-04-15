import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

const quotes = [
  "삶은 우리가 만드는 것입니다.",
  "가장 어두운 밤이 지나면 가장 밝은 아침이 오게 됩니다.",
  "노력없이 얻는 것은 없습니다.",
  "한 걸음씩 나아가면 언젠가는 목표에 도달할 수 있습니다.",
  "포기하지 말고 꿈을 향해 나아가세요.",
];

export function WelcomeComponent() {
  const { username } = useParams();
  const authContext = useAuth();
  const [weatherData, setWeatherData] = useState(null);
  const [currentHour, setCurrentHour] = useState("");
  const [currentMinute, setCurrentMinute] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0); // 명언 인덱스
  const [quoteOpacity, setQuoteOpacity] = useState(1); // 명언 투명도

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(() => {
      const currentTime = new Date();
      setCurrentHour(currentTime.getHours().toString().padStart(2, "0"));
      setCurrentMinute(currentTime.getMinutes().toString().padStart(2, "0"));
    }, 10); // 매 초마다 업데이트
    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
  }, []);

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      // 5초마다 명언 변경
      const quoteInterval = setInterval(() => {
        const fadeOutInterval = setInterval(() => {
          setQuoteOpacity((prevOpacity) => Math.max(prevOpacity - 0.05, 0)); // 0.01씩 내리기
        }, 20); // 0.005초마다 내리기
        setTimeout(() => {
          clearInterval(fadeOutInterval); // 내리는 인터벌 정리
          setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
          const fadeInInterval = setInterval(() => {
            setQuoteOpacity((prevOpacity) => Math.min(prevOpacity + 0.05, 1)); // 0.01씩 올리기
          }, 20); // 0.005초마다 올리기
          setTimeout(() => {
            clearInterval(fadeInInterval); // 올리는 인터벌 정리
          }, 400); // 0.1초 후에 올리는 인터벌 정리
        }, 400); // 0.45초 후에 내리는 인터벌 정리 및 명언 변경
      }, 5000);
      return () => clearInterval(quoteInterval); // 컴포넌트가 언마운트될 때 인터벌 정리
    }
  }, []);

  async function fetchWeatherData() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=005e33b153917c04a3c5990527c9ffff&units=metric&lang=kr`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    });
  }

  return (
    <div className="WelcomeComponent">
      <div className="weather-info">
        {weatherData && (
          <>
            <p>
              {weatherData.name} / {weatherData.weather[0].description} /{" "}
              {weatherData.main.temp.toFixed(1)} °C
            </p>
          </>
        )}
      </div>
      <h1>
        {currentHour}:{currentMinute}
      </h1>
      <h3 style={{ opacity: quoteOpacity }}>
        {authContext.isAuthenticated
          ? `어서오세요 ${username}님`
          : quotes[quoteIndex]}
      </h3>
    </div>
  );
}
