import React from "react";

const Header = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4">
      <div className="text-white text-2xl">Mon Application</div>
      <ul className="flex space-x-4">
        <li>
          <a href="#" className="text-white hover:text-gray-400">
            Accueil
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-400">
            À Propos
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
