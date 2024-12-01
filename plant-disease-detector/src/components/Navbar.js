import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          TechSquad
        </a>
        <div className="space-x-4">
          <a href="/plantdisease" className="hover:text-green-300">
            Home
          </a>
          <a href="/signup" className="hover:text-green-300">
            Signup
          </a>
          <a href="/" className="hover:text-green-300">
            Login
          </a>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
