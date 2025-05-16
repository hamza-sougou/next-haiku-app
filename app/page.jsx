import React from "react";
import RegisterForm from "../components/RegisterForm";
import { getUserFromCookie } from "../lib/getUser";

const Page = async () => {
  const user = await getUserFromCookie(); // <--- await ici

  return (
    <>
      {user && <h1>Bienvenue {user.username}</h1>}
      {!user && (
        <>
          <p className="text-center text-2xl my-5">
            Vous n'avez pas encore de compte? <strong>Créez-en un !</strong>
          </p>
          <RegisterForm />
        </>
      )}
    </>
  );
};

export default Page;
