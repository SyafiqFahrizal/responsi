import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddTabungan from "./pages/AddTabungan";
import TabunganDetail from "./pages/TabunganDetail";
import { db } from "./firebase"; // Impor Firebase
import { doc, deleteDoc } from "firebase/firestore"; // Impor deleteDoc untuk menghapus dokumen

function App() {
  const [tabungans, setTabungans] = useState([]);

  // Fungsi untuk menambahkan tabungan baru
  const addTabungan = (newTabungan) => {
    setTabungans((prevTabungans) => [...prevTabungans, newTabungan]);
  };

  // Fungsi untuk mengupdate tabungan yang sudah ada
  const updateTabungan = (id, updatedTabungan) => {
    setTabungans((prevTabungans) =>
      prevTabungans.map((tabungan) =>
        tabungan.id === id ? { ...tabungan, ...updatedTabungan } : tabungan
      )
    );
  };

  // Fungsi untuk menghapus tabungan
  const deleteTabungan = async (id) => {
    try {
      // Hapus tabungan dari Firestore
      const docRef = doc(db, "tabungans", id);
      await deleteDoc(docRef);

      // Hapus tabungan dari state lokal
      setTabungans((prevTabungans) =>
        prevTabungans.filter((tabungan) => tabungan.id !== id)
      );
    } catch (error) {
      console.error("Error deleting tabungan:", error);
      alert("Terjadi kesalahan saat menghapus tabungan.");
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={<Home tabungans={tabungans} deleteTabungan={deleteTabungan} />}
            />
            <Route
              path="/add"
              element={<AddTabungan addTabungan={addTabungan} />}
            />
            <Route
              path="/detail/:id"
              element={<TabunganDetail updateTabungan={updateTabungan} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
