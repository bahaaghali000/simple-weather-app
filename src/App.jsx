import { useEffect, useState } from "react";

import { CiTempHigh } from "react-icons/ci";
import { BiWind } from "react-icons/bi";
import { FaDroplet } from "react-icons/fa6";
import { AiFillAlert } from "react-icons/ai";

const URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "f33a484cf794d08d0148764789aaba32";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async (search) => {
      const res = await fetch(
        `${URL}weather?q=${search || "madrid"}&units=metric&APPID=${API_KEY}`
      );
      setWeather(await res.json());
      setLoading(false);
    };

    fetchData(search);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.children[0].value.trim());
  };

  console.log(weather);
  return (
    <div className="main-container px-12 sm:px-8 py-4 mx-auto">
      <main className=" lg:w-3/4  sm:w-4/5 my-12 mx-auto ">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter City" />
        </form>

        {loading ? (
          <h1 className="text-3xl text-center font-semibold mt-8">
            Loading...
          </h1>
        ) : weather.main ? (
          <div>
            <div className="flex items-center justify-between px-5 mb-10">
              <div>
                <h1 className=" text-white mb-2 font-semibold text-lg">
                  {weather.name}, {weather.sys.country}
                </h1>
                <p className="text-sm mb-12 capitalize">
                  {weather.weather[0].description}
                </p>
                <h2 className="text-5xl text-white font-semibold temp">
                  {Math.round(weather.main.temp)}
                  <sup>&deg;C</sup>
                </h2>
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className=" w-32"
              />
            </div>

            <div className="bg-slate-800 px-5 py-3 rounded-xl">
              <p className="text-base uppercase mb-5 font-semibold">
                air conditions
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-2xl px-4 hover:bg-slate-600 rounded-xl cursor-pointer">
                  <CiTempHigh fontSize={26} />
                  <div>
                    <p className="text-lg">Real Feel </p>
                    <h2 className="font-semibold text-white text-xl ml-1">
                      {Math.round(weather?.main?.feels_like)}
                      <sup>&deg;C</sup>
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-2xl px-4 hover:bg-slate-600 rounded-xl cursor-pointer">
                  <BiWind fontSize={26} />
                  <div>
                    <p className="text-lg">Wind</p>
                    <h2 className="font-semibold text-white text-xl ml-1 ">
                      {weather?.wind?.speed?.toFixed(1)} Km/h
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-2xl px-4 hover:bg-slate-600 rounded-xl cursor-pointer ">
                  <FaDroplet fontSize={26} />
                  <div>
                    <p className="text-lg">Humidity</p>
                    <h2 className="font-semibold text-white text-xl ml-1">
                      {weather?.main?.humidity}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-2xl px-4 hover:bg-slate-600 rounded-xl cursor-pointer">
                  <AiFillAlert fontSize={26} />
                  <div>
                    <p className="text-lg">Pressure</p>
                    <h2 className="font-semibold text-white text-xl ml-1 ">
                      {weather?.main?.pressure}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-center text-4xl mt-16">Invaild Entry</h1>
        )}
      </main>
    </div>
  );
}

export default App;
