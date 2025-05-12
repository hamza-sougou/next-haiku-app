import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <dv>
      <h1>Accueil</h1>
      <Link href="/login">Se connecter</Link>
    </dv>
  );
};

export default page;
