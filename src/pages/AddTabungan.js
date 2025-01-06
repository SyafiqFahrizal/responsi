import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AddTabungan({ addTabungan }) {
  const [nama, setNama] = useState("");
  const [target, setTarget] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "tabungans"), {
        nama,
        target: parseInt(target),
        terkumpul: 0, // Nilai terkumpul dimulai dari 0
      });
      addTabungan({ id: docRef.id, nama, target: parseInt(target), terkumpul: 0 });
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Tambah Tabungan Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama Tabungan</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Target Tabungan</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Simpan Tabungan
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTabungan;
