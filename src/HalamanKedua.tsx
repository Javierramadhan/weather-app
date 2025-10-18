import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // <-- Tambahkan 'Link' di sini
import "./index.css";

const API_KEY = "84e62af625e14b7799e62144251210";
interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    avghumidity: number; // <-- Tambahkan ini
    maxwind_kph: number; // <-- Tambahkan ini
    condition: {
      text: string;
    };
  };
}
const getWeatherIcon = (conditionText: string) => {
  const lowerCaseText = conditionText.toLowerCase();

  // Kita akan memeriksa kata kunci dari API WeatherAPI
  if (lowerCaseText.includes("cloudy") || lowerCaseText.includes("overcast")) {
    return "../img/berawan.svg";
  } else if (
    lowerCaseText.includes("sunny") ||
    lowerCaseText.includes("clear")
  ) {
    return "../img/cerah.svg";
  } else if (lowerCaseText.includes("rain")) {
    return "../img/hujan.svg";
  } else if (lowerCaseText.includes("thunder")) {
    return "../img/hujanpetir.svg";
  } else if (lowerCaseText.includes("mist") || lowerCaseText.includes("fog")) {
    return "../img/kabut.svg";
  } else if (
    lowerCaseText.includes("snow") ||
    lowerCaseText.includes("sleet")
  ) {
    return "../img/salju.svg";
  } else {
    // Ikon default jika tidak ada yang cocok
    return "../img/berawan.svg";
  }
};

const getWeatherBackground = (conditionText: string) => {
  const lowerCaseText = conditionText.toLowerCase();

  if (lowerCaseText.includes("cloudy") || lowerCaseText.includes("overcast")) {
    return "/video/berawan.mp4";
  } else if (
    lowerCaseText.includes("sunny") ||
    lowerCaseText.includes("clear")
  ) {
    return "/video/cerah.mp4";
  } else if (lowerCaseText.includes("rain")) {
    return "/video/hujan.mp4";
  } else if (lowerCaseText.includes("thunder")) {
    return "/video/hujanpetir.mp4";
  } else if (lowerCaseText.includes("mist") || lowerCaseText.includes("fog")) {
    return "/video/berkabut.mp4";
  } else if (
    lowerCaseText.includes("snow") ||
    lowerCaseText.includes("sleet")
  ) {
    return "/video/bersalju.mp4";
  } else {
    // Video default jika tidak ada yang cocok
    return "/video/berawan.mp4";
  }
};

const translateWeatherCondition = (conditionText: string) => {
  const lowerCaseText = conditionText.toLowerCase();

  if (lowerCaseText.includes("cloudy") || lowerCaseText.includes("overcast")) {
    return "Berawan";
  } else if (
    lowerCaseText.includes("sunny") ||
    lowerCaseText.includes("clear")
  ) {
    return "Cerah";
  } else if (lowerCaseText.includes("rain")) {
    return "Hujan";
  } else if (lowerCaseText.includes("thunder")) {
    return "Hujan Petir";
  } else if (lowerCaseText.includes("mist") || lowerCaseText.includes("fog")) {
    return "Berkabut";
  } else if (
    lowerCaseText.includes("snow") ||
    lowerCaseText.includes("sleet")
  ) {
    return "Salju";
  } else {
    // Jika tidak ada terjemahan, tampilkan teks aslinya
    return conditionText;
  }
};

function HalamanKedua() {
  const [isLoading, setIsLoading] = useState(true);
  const { cityName } = useParams<{ cityName: string }>();
  const [time, setTime] = useState(new Date());
  const [input, setInput] = useState("");
  const [city, setCity] = useState(cityName || "Bekasi");
  const [forecasts, setForecasts] = useState<ForecastDay[]>([]);
  const [selectedWeather, setSelectedWeather] = useState<ForecastDay | null>(
    null,
  );
  const [isLoaded, setIsLoaded] = useState(false); // <-- TAMBAHKAN INI

  useEffect(() => {
    // 1. Membuat "resep"

    const fetchWeatherData = async () => {
      setIsLoading(true); // <-- Bisa ditambahkan di sini
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`,
        );
        const data = await response.json();
        setForecasts(data.forecast.forecastday);
        if (data.forecast.forecastday.length > 0) {
          setSelectedWeather(data.forecast.forecastday[0]);
        }
      } catch (error) {
        console.error("Gagal mengambil data cuaca:", error);
        setForecasts([]);
        setSelectedWeather(null);
      } finally {
        // <-- 'finally' selalu dijalankan, baik sukses atau error
        setIsLoading(false); // <-- Matikan loading di sini
      }
    }; // 2. Menjalankan "resep" itu

    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    // Perbarui jam setiap 1 detik
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Bersihkan timer saat komponen tidak lagi ditampilkan
    return () => clearInterval(timer);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setCity(input); // Perbarui kota dengan input dari search bar
      setInput(""); // <-- TAMBAHKAN INI
    }
  };

  // ▼▼▼ TAMBAHKAN EFFECT INI ▼▼▼
  useEffect(() => {
    // Memicu animasi saat komponen dimuat
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // 100ms

    return () => clearTimeout(timer);
  }, []); // <-- Array kosong berarti hanya berjalan sekali
  // ▲▲▲ AKHIR EFFECT ▲▲▲

  const cityList = [
    // Jawa
    "Jakarta",
    "Bandung",
    "Bekasi",
    "Bogor",
    "Cirebon",
    "Depok",
    "Malang",
    "Semarang",
    "Serang",
    "Surabaya",
    "Surakarta",
    "Tangerang",
    "Yogyakarta",

    // Sumatera
    "Banda Aceh",
    "Bandar Lampung",
    "Batam",
    "Bengkulu",
    "Jambi",
    "Medan",
    "Padang",
    "Palembang",
    "Pekanbaru",
    "Pematangsiantar",

    // Kalimantan
    "Balikpapan",
    "Banjarmasin",
    "Palangkaraya",
    "Pontianak",
    "Samarinda",
    "Tarakan",

    // Sulawesi
    "Gorontalo",
    "Kendari",
    "Makassar",
    "Manado",
    "Palu",

    // Bali & Nusa Tenggara
    "Denpasar",
    "Kupang",
    "Mataram",

    // Maluku & Papua
    "Ambon",
    "Jayapura",
    "Manokwari",
    "Sorong",
    "Ternate",
  ];

  const filteredCities = cityList.filter((city) =>
    city.toLowerCase().startsWith(input.toLowerCase()),
  );

  const sortedForecasts = [...forecasts].sort((a, b) => {
    const dayA = new Date(a.date).getDay(); // 0=Minggu, 1=Senin, ...
    const dayB = new Date(b.date).getDay();

    // Ubah Minggu (0) menjadi 7 agar berada di akhir
    const sortOrderA = dayA === 0 ? 7 : dayA;
    const sortOrderB = dayB === 0 ? 7 : dayB;

    return sortOrderA - sortOrderB;
  });

  // ▼▼▼ TAMBAHKAN BLOK IF INI ▼▼▼
  if (isLoading) {
    return (
      // Tampilan saat loading
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-white">
        <video
          autoPlay
          loop
          muted
          src="/video/cerahberawan.mp4"
          className="absolute left-0 top-0 -z-10 h-full w-full scale-125 object-cover"
        ></video>
        <img
          src="/video/loading_gray.gif" // Pastikan path ini benar
          className="h-16 w-16" // Atur ukuran GIF jika perlu
        />
        <p className="animate-pulse text-xl">
          Memuat data cuaca untuk {city}...
        </p>
        {/* Anda bisa menambahkan spinner SVG di sini */}
      </div>
    );
  }
  // ▲▲▲ AKHIR BLOK IF ▲▲▲

  return (
    <section className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-slate-300 py-10">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        src={
          selectedWeather
            ? getWeatherBackground(selectedWeather.day.condition.text)
            : "/video/berawan.mp4"
        }
        className="absolute left-0 top-0 h-full w-full scale-125 object-cover"
      ></video>
      <div
        className={`flex h-fit w-full flex-row justify-between px-9 transition-all duration-500 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"}`}
      >
        <Link to="/">
          <div className="flex h-fit w-fit items-center gap-x-2 rounded-full border border-white/15 bg-black/10 px-5 py-3 text-white shadow-sm shadow-black/10 backdrop-blur-sm">
            <img src="../img/Logo.svg" alt="" />
            <h1 className="font-bold">Weather.ly</h1>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex min-w-[300px] max-w-[1200px] flex-col items-center gap-6 text-center text-white">
          <div className="relative w-full max-w-md">
            <img
              src="../img/Search.svg" // Pastikan path ini benar
              alt="Search Icon"
              className="absolute left-5 top-1/2 z-10 h-6 w-6 -translate-y-1/2"
            />

            <input
              type="search"
              placeholder="Cari Kota Kamu"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-full border border-white/30 bg-black/10 py-4 pl-14 pr-4 font-jakarta text-white backdrop-blur-md transition-all duration-300 placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white"
            />

            {/* --- Tampilan Autocomplete Dinamis --- */}
            {input.length > 0 && (
              <div className="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/30 bg-white/20 text-left backdrop-blur-md">
                <ul className="custom-scrollbar max-h-[168px] overflow-y-auto">
                  {filteredCities.map((kota) => (
                    <li
                      key={kota}
                      className="cursor-pointer px-6 py-3 text-white transition-colors duration-200 hover:bg-white/20"
                      onClick={() => {
                        setCity(kota); // 1. Cari cuaca untuk kota yang diklik
                        setInput(""); // <-- UBAH MENJADI INI
                      }}
                    >
                      {kota}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* --- Akhir Tampilan Autocomplete --- */}
          </div>
        </div>
        {/* Search Bar */}

        <div className="flex h-fit w-fit flex-row items-center gap-4 rounded-full border border-white/15 bg-black/15 px-5 py-4 text-white shadow-sm shadow-black/10 backdrop-blur-sm">
          <h1>Kota {city}</h1>
          <h1>
            {time.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h1>
        </div>
      </div>

      {/* Informasi Cuaca */}

      <div
        className={`infocuaca flex w-full flex-row justify-between px-9 transition-all delay-200 duration-500 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"}`}
      >
        {/* Info Kota */}
        <div className="flex h-[200px] w-[300px] flex-col gap-2 rounded-xl border border-white/15 bg-black/10 px-5 py-6 text-white shadow-sm shadow-black/10 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white">Kota {city}</h1>
          <h2 className="font-medium text-white">
            {selectedWeather
              ? new Date(selectedWeather.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Pilih Tanggal"}
          </h2>
          <p className="text-justify text-sm text-white">
            {selectedWeather
              ? `Hari ini cuaca terasa ${translateWeatherCondition(
                  selectedWeather.day.condition.text,
                ).toLowerCase()}. Nikmati harimu!`
              : "Pilih salah satu hari di bawah untuk melihat detail cuaca."}
          </p>
        </div>
        {/* Info Suhu */}
        <div className="flex h-[200px] w-[300px] flex-col items-end justify-center gap-2 rounded-xl border border-white/10 bg-black/10 px-5 py-4 text-white shadow-sm shadow-black/10 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white">
            {selectedWeather
              ? new Date(selectedWeather.date).toLocaleDateString("id-ID", {
                  weekday: "long",
                })
              : "Pilih Hari"}
          </h2>
          <div className="flex flex-row gap-3">
            <img
              src={
                selectedWeather
                  ? getWeatherIcon(selectedWeather.day.condition.text)
                  : "../img/berawan.svg"
              }
              alt="Ikon Cuaca"
            />
            <h1 className="text-5xl font-bold text-white">
              {selectedWeather
                ? `${Math.round(selectedWeather.day.avgtemp_c)}°C`
                : "--"}
            </h1>
          </div>
          <h2 className="text-xl font-medium text-white">
            {selectedWeather
              ? translateWeatherCondition(selectedWeather.day.condition.text)
              : "Cuaca"}
          </h2>
          {/* Flex */}
          <div className="flex flex-row gap-6">
            {/* Humidity */}
            <div className="flex flex-row gap-3">
              <img src="../img/humidity.svg" alt="" />
              <p className="text-justify text-xl font-medium text-white">
                {selectedWeather ? `${selectedWeather.day.avghumidity}%` : "--"}
              </p>
            </div>
            {/* Windspeed */}
            <div className="flex flex-row gap-3">
              <img src="../img/windspeed.svg" alt="" />
              <p className="text-justify text-xl font-medium text-white">
                {" "}
                {selectedWeather
                  ? `${Math.round(selectedWeather.day.maxwind_kph)} kph`
                  : "--"}
              </p>
            </div>
          </div>
          {/* Flex End */}
        </div>
      </div>

      {/* Card Hari */}
      <div
        className={`cardhari flex flex-row gap-8 px-10 transition-all delay-300 duration-500 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"}`}
      >
        {sortedForecasts.map((forecast) => (
          <i
            key={forecast.date}
            className={`flex h-fit w-full cursor-pointer flex-col items-center gap-1 gap-x-2 rounded-xl border px-5 py-5 text-white shadow-sm shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/25 ${
              selectedWeather?.date === forecast.date
                ? "border-4 border-white bg-white/30" // <-- Gaya saat terpilih
                : "border-white/15 bg-black/10" // <-- Gaya default
            }`}
            onClick={() => setSelectedWeather(forecast)}
          >
            {/* Konten kartu (h1, img, h2) tetap sama */}
            <h1 className="text-xl font-medium not-italic text-white">
              {new Date(forecast.date).toLocaleDateString("id-ID", {
                weekday: "long",
              })}
            </h1>
            <img src={getWeatherIcon(forecast.day.condition.text)} alt="" />
            <h1 className="text-3xl font-bold not-italic text-white">
              {Math.round(forecast.day.avgtemp_c)}°C
            </h1>
            <h2 className="not-italic text-white">
              {translateWeatherCondition(forecast.day.condition.text)}
            </h2>
          </i>
        ))}
      </div>
    </section>
  );
}

export default HalamanKedua;
