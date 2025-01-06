import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">GoalSaver</h1>
        <div>
          <Link to="/" className="mr-4 hover:underline">
            Tabungan
          </Link>
          <Link to="/add" className="hover:underline">
            Tambah Tabungan
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
