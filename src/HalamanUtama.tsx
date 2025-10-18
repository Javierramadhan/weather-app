// src/HalamanUtama.tsx

import { useState, useEffect } from "react"; // <-- 1. Pastikan useEffect di-import
import { useNavigate } from "react-router-dom";
import "./index.css";

// Daftar kota untuk autocomplete
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

function HalamanUtama() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false); // <-- 2. Tambahkan state untuk animasi

  // 3. Tambahkan useEffect untuk memicu animasi
  useEffect(() => {
    // Kita beri jeda sedikit agar transisi bisa berjalan
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // 100ms

    return () => clearTimeout(timer); // Membersihkan timer
  }, []); // <-- Array kosong berarti ini hanya berjalan sekali saat dimuat

  // Buat fungsi untuk menangani pencarian
  const handleSearch = (cityToSearch: string) => {
    if (cityToSearch.trim() !== "") {
      navigate(`/weather/${cityToSearch}`);
    }
  };

  // Buat daftar kota yang terfilter
  const filteredCities = cityList.filter(
    (city) =>
      input.length > 0 && city.toLowerCase().startsWith(input.toLowerCase()),
  );

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden pb-24 pt-4">
      {/* Latar belakang video */}
      <video
        autoPlay
        loop
        muted
        src="/video/cerahberawan.mp4"
        className="absolute left-0 top-0 -z-10 h-full w-full scale-125 object-cover"
      ></video>

      {/* 4. Perbarui JSX untuk animasi (Logo) */}
      <div
        className={`flex w-fit items-center gap-x-2 rounded-full border border-white/15 bg-black/10 px-5 py-3 text-white shadow-sm shadow-black/10 backdrop-blur-sm transition-all duration-500 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"}`}
      >
        <img src="img/logo.svg" alt="" />
        <h1 className="font-bold">Weather.ly</h1>
      </div>

      {/* Search Bar & Judul */}
      <div className="flex min-w-[300px] max-w-[1200px] flex-col items-center gap-6 text-center text-white">
        {/* 4. Perbarui JSX untuk animasi (Judul) */}
        <div
          className={`transition-all delay-200 duration-500 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"}`}
        >
          <h1
            className="mb-2 text-5xl font-bold md:text-6xl"
            style={{ textShadow: "2px 2px 3px rgba(0,0,0,0.25)" }}
          >
            Selamat Datang
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
          >
            Cari Tahu Cuaca Di Tempatmu
          </p>
        </div>

        {/* 4. Perbarui JSX untuk animasi (Search Bar) */}
        <div
          className={`relative w-full max-w-md transition-all delay-300 duration-500 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"}`}
        >
          <img
            src="../img/Search.svg" // Pastikan path ini benar
            alt="Search Icon"
            className="absolute left-5 top-1/2 z-10 h-6 w-6 -translate-y-1/2"
          />

          <input
            type="search"
            placeholder="Cari Kota Kamu"
            className="w-full rounded-full border border-white/30 bg-black/10 py-4 pl-14 pr-4 font-jakarta text-white shadow-md backdrop-blur-md transition-all duration-300 placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(input);
              }
            }}
          />

          {/* --- Tampilan Autocomplete Dinamis --- */}
          {input.length > 0 && (
            <div className="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/30 bg-black/10 text-left backdrop-blur-md">
              <ul className="custom-scrollbar max-h-[168px] overflow-y-auto">
                {filteredCities.map((kota) => (
                  <li
                    key={kota}
                    className="cursor-pointer px-6 py-3 text-white transition-colors duration-200 hover:bg-black/10"
                    onClick={() => handleSearch(kota)}
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

      <div className="h-5 w-full bg-slate-400 bg-opacity-0"></div>
    </section>
  );
}

export default HalamanUtama;
