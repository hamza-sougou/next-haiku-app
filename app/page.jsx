import React from "react";
import RegisterForm from "../components/RegisterForm";

const page = () => {
  return (
    <>
      <p className="text-center text-2xl my-5">
        Vous n'avez pas encore de compte? <strong>Créez-en un !</strong>
      </p>
      <RegisterForm />
    </>
  );
};

export default page;
