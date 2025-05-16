import Link from "next/link";
import React from "react";
import { getUserFromCookie } from "../../lib/getUser";
import { logout } from "../../actions/userController";

const Header = async () => {
  const user = await getUserFromCookie();

  return (
    <div className="navbar bg-amber-700 shadow-sm rounded-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          HAIKU !!!
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user && (
            <li>
              <form action={logout} className="btn btn-danger">
                <button>Déconnexion</button>
              </form>
            </li>
          )}
          {!user && (
            <li>
              <Link href="/login">Connexion</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
