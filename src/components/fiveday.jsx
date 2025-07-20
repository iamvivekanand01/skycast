import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  // Get one forecast per day (around 12:00 PM)
  const dailyForecast = [];
  const seenDates = new Set();

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt_txt);
    const day = date.toDateString();

    // Choose forecasts around 12 PM and skip duplicate days
    if (!seenDates.has(day) && date.getHours() === 12) {
      seenDates.add(day);
      dailyForecast.push(item);
    }
  });

  return (
    <div className="bg-gray-700 text-white rounded-xl p-4 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">5-Day Forecast</h2>
      <div className="space-y-4">
        {dailyForecast.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center border-b border-gray-500 pb-2 text-sm"
          >
            <div className="flex items-center space-x-2">
              <WbSunnyIcon />
              <span className="capitalize">{item.weather[0].description}</span>
            </div>
            <div className="text-center">{formatDate(item.dt_txt)}</div>
            <div className="text-right font-semibold">
              {Math.round(item.main.temp)}°C
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
