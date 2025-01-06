import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import { db } from "../firebase"; // Impor db dari Firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";

function TabunganDetail({ updateTabungan }) {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const navigate = useNavigate(); // Hook untuk navigasi
  const [tabungan, setTabungan] = useState(null);
  const [inputJumlah, setInputJumlah] = useState(""); // State untuk jumlah input user

  useEffect(() => {
    // Fungsi untuk mendapatkan data tabungan berdasarkan ID
    const fetchTabungan = async () => {
      try {
        const docRef = doc(db, "tabungans", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTabungan(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchTabungan();
  }, [id]);

  const handleTambahTabungan = async () => {
    if (!inputJumlah || isNaN(inputJumlah)) {
      alert("Masukkan jumlah yang valid!");
      return;
    }

    const jumlah = parseInt(inputJumlah);
    const updatedTerkumpul = (tabungan.terkumpul || 0) + jumlah;

    try {
      const docRef = doc(db, "tabungans", id);
      await updateDoc(docRef, { terkumpul: updatedTerkumpul });
      setTabungan((prev) => ({
        ...prev,
        terkumpul: updatedTerkumpul,
      }));
      setInputJumlah(""); // Reset input setelah sukses
      alert("Tabungan berhasil ditambahkan!");

      // Mengupdate tabungan di state global menggunakan updateTabungan
      updateTabungan(id, { terkumpul: updatedTerkumpul });

      // Pindah ke halaman Home setelah sukses
      navigate("/");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Terjadi kesalahan, coba lagi.");
    }
  };

  if (!tabungan) {
    return <div>Loading...</div>; // Tampilkan loading jika data belum ada
  }

  const { nama, terkumpul = 0, target = 0 } = tabungan;

  // Menghitung progres tabungan
  const progress = Math.min((terkumpul / target) * 100, 100);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">{nama}</h1>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">Terkumpul: Rp{terkumpul.toLocaleString()}</p>
        <p className="text-gray-600 mb-4">Target: Rp{target.toLocaleString()}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mb-4">Progress: {progress.toFixed(1)}%</p>
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          className="border rounded p-2 w-full"
          placeholder="Masukkan jumlah"
          value={inputJumlah}
          onChange={(e) => setInputJumlah(e.target.value)}
        />
        <button
          onClick={handleTambahTabungan}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Tambah Tabungan
        </button>
      </div>
    </div>
  );
}

export default TabunganDetail;
