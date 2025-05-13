import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="navbar bg-amber-700 shadow-sm rounded-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          HAIKU !!!
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/login">Connexion</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
