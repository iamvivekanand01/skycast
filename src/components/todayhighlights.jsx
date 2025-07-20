import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "../../src/components/Highlightbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1: return "Good";
      case 2: return "Fair";
      case 3: return "Moderate";
      case 4: return "Poor";
      case 5: return "Very Poor";
      default: return "Unknown";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main.pressure} hPa`, Icon: CompressIcon },
    { title: "Visibility", value: `${visibility / 1000} km`, Icon: VisibilityIcon },
    { title: "Feels Like", value: `${main.feels_like}°C`, Icon: DeviceThermostatIcon },
  ];

  return (
    <div className="bg-gray-600 text-white rounded-xl p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Today's Highlights</h2>

      {/* Air Quality + Sunrise/Sunset */}
      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6 w-full">
        {/* Air Quality Index */}
        <div className="bg-gray-700 p-6 rounded-lg flex-1 min-w-[300px] max-w-[500px]">
          <div className="flex justify-between items-center text-lg font-semibold mb-4">
            <p>Air Quality Index</p>
            <div className="bg-green-600 text-white text-sm font-bold px-2 py-1 rounded-md">
              {renderAirQualityDescription(airQualityIndex)}
            </div>
          </div>
          <AirIcon className="text-4xl mb-2" />
          <div className="grid grid-cols-2 gap-4 text-sm mt-4">
            <div>
              <p className="font-semibold">CO</p>
              <p>{co} µg/m³</p>
            </div>
            <div>
              <p className="font-semibold">NO</p>
              <p>{no} µg/m³</p>
            </div>
            <div>
              <p className="font-semibold">NO₂</p>
              <p>{no2} µg/m³</p>
            </div>
            <div>
              <p className="font-semibold">O₃</p>
              <p>{o3} µg/m³</p>
            </div>
          </div>
        </div>

        {/* Sunrise and Sunset */}
        <div className="bg-gray-700 p-6 rounded-lg flex-1 min-w-[300px] max-w-[500px]">
          <p className="text-lg font-semibold mb-4">Sunrise and Sunset</p>
          <div className="flex justify-around items-center text-center gap-6">
            <div className="flex flex-col items-center">
              <WbSunnyIcon className="text-yellow-400 text-4xl" />
              <p className="text-xl mt-1">
                {new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="text-sm">Sunrise</p>
            </div>
            <div className="flex flex-col items-center">
              <NightsStayIcon className="text-indigo-300 text-4xl" />
              <p className="text-xl mt-1">
                {new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="text-sm">Sunset</p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlight Boxes */}
      <div className="flex flex-wrap justify-between gap-4 mt-6">
        {highlights.map((highlight, index) => (
          <HighlightBox
            key={index}
            title={highlight.title}
            value={highlight.value}
            Icon={highlight.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;
