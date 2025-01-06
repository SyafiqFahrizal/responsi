import React from "react";
import { useNavigate } from "react-router-dom";
import TabunganCard from "../components/TabunganCard";

function Home({ tabungans, deleteTabungan }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cover bg-center py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard Tabungan</h1>
        <p className="text-lg text-gray-600 mt-2">Kelola dan pantau tabunganmu dengan mudah</p>
      </header>

      {/* Bagian Foto Utama */}
      <div className="mb-8 flex justify-center">
        <img
          src="/images/dashboard.png"
          alt="Dashboard Utama"
          className="w-full max-w-4xl h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Bagian Daftar Tabungan */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tabungans.length > 0 ? (
          tabungans.map((tabungan) => (
            <TabunganCard
              key={tabungan.id}
              id={tabungan.id}
              nama={tabungan.nama}
              terkumpul={tabungan.terkumpul}
              target={tabungan.target}
              deleteTabungan={deleteTabungan} // Menambahkan fungsi deleteTabungan ke setiap card
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            <p className="text-xl">Belum ada tabungan yang ditambahkan.</p>
            <p className="text-md mt-2 mb-4">
              Silakan tambahkan tabungan melalui menu tambah.
            </p>
            {/* Tombol Tambah Tabungan */}
            <button
              onClick={() => navigate("/add")}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Tambah Tabungan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
