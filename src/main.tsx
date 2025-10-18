import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// 1. Import komponen yang dibutuhkan dari react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 2. Import komponen halaman yang sudah dibuat
import HalamanUtama from "./HalamanUtama.tsx";
import HalamanKedua from "./HalamanKedua.tsx";

// 3. Definisikan rute/halaman Anda
const router = createBrowserRouter([
  {
    path: "/", // URL untuk halaman utama
    element: <HalamanUtama />,
  },
  {
    // ▼▼▼ UBAH INI ▼▼▼
    path: "/weather/:cityName", // Rute dinamis untuk halaman cuaca
    // ▲▲▲ UBAH INI ▲▲▲
    element: <HalamanKedua />,
  },
]);

// 4. Gunakan RouterProvider untuk merender aplikasi
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
