import React from "react";
import { useNavigate } from "react-router-dom";

function TabunganCard({ id, nama, terkumpul, target, deleteTabungan }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tabungan ini?")) {
      deleteTabungan(id); // Memanggil fungsi deleteTabungan
    }
  };

  // Menghitung progres tabungan
  const progress = Math.min((terkumpul / target) * 100, 100);

  // Mengecek apakah progres sudah mencapai 100%
  const isCompleted = progress === 100;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800">{nama}</h2>
      <p className="text-gray-600">Terkumpul: Rp{terkumpul.toLocaleString()}</p>
      <p className="text-gray-600">Target: Rp{target.toLocaleString()}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-4">Progress: {progress.toFixed(1)}%</p>
      <div className="flex justify-between">
        {/* Tombol Lihat Detail atau Success */}
        <button
          onClick={isCompleted ? null : () => navigate(`/detail/${id}`)} // Jika sudah 100%, tidak bisa ditekan
          className={`${
            isCompleted
              ? "bg-green-500 text-white py-2 px-4 rounded cursor-not-allowed"
              : "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          }`}
          disabled={isCompleted} // Nonaktifkan tombol jika progress sudah 100%
        >
          {isCompleted ? "Success" : "Lihat Detail"}
        </button>

        {/* Tombol Hapus */}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

export default TabunganCard;
