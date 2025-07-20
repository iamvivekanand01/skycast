import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";

const MainWeatherCard = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "Date not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return (
        <WbSunnyIcon className="ml-3 text-4xl text-orange-500" />
      );
    } else if (temperatureCelsius < 10) {
      return <AcUnitIcon className="ml-3 text-4xl text-blue-500" />;
    } else {
      return <CloudIcon className="ml-3 text-4xl text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-600 text-white rounded-xl p-6 w-full max-w-xs shadow-md">
      <div className="text-lg font-medium mb-2">Now</div>
      <div className="flex items-center text-4xl font-bold">
        {temperatureCelsius}°c
        {renderTemperatureIcon()}
      </div>
      <div className="text-sm mt-2 capitalize">{weatherDescription}</div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <CalendarMonthIcon className="text-white" />
          <span>{currentDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <LocationOnIcon className="text-white" />
          <span>
            {cityName}, {countryName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
