"use server";

import { cookies } from "next/headers";
import { getCollection } from "../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

function isAlphanumeric(str) {
  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(str);
}

export const logout = async function () {
  cookies().delete("ourhaikuapp");
  redirect("/");
};

export const register = async function (prevState, formData) {
  const errors = {};

  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (typeof ourUser.username != "string") ourUser.username = "";
  if (typeof ourUser.password != "string") ourUser.password = "";

  ourUser.username = ourUser.username.trim();
  ourUser.password = ourUser.password.trim();

  // Validation du nom d'utilisateur

  if (ourUser.username.length < 3) {
    errors.username =
      "Le nom d'utilisateur doit contenir au moins 3 caractères";
  }
  if (ourUser.username.length > 30) {
    errors.username =
      "Le nom d'utilisateur doit contenir au maximum 30 caractères";
  }

  if (!isAlphanumeric(ourUser.username)) {
    errors.username =
      "Le nom d'utilisateur ne doit contenir que des lettres et des chiffres";
  }

  if (ourUser.username == "") {
    errors.username = "Le nom d'utilisateur ne peut pas être vide";
  }

  // Validation du mot de passe

  if (ourUser.password.length < 3) {
    errors.password = "Le mot de passe doit contenir au moins 3 caractères";
  }

  if (ourUser.password.length > 30) {
    errors.password = "Le mot de passe doit contenir au maximum 30 caractères";
  }

  if (ourUser.password == "") {
    errors.username = "Le mot de passe ne peut pas être vide";
  }

  if (errors.username || errors.password) {
    return {
      errors: errors,
      success: false,
    };
  }

  const salt = bcrypt.genSaltSync(10);
  ourUser.password = bcrypt.hashSync(ourUser.password, salt);

  // Stockage de l'utilisateur dans la base de données
  const usersCollection = await getCollection("users");

  // Vérifier si le nom d'utilisateur est déjà pris
  const existingUser = await usersCollection.findOne({
    username: ourUser.username,
  });

  if (existingUser) {
    errors.username = "Ce nom d'utilisateur est déjà pris";
    return {
      errors: errors,
      success: false,
    };
  }

  // Insérer le nouvel utilisateur
  const newUser = await usersCollection.insertOne(ourUser);
  const userId = newUser.insertedId.toString();

  // Création du token JWT
  const token = jwt.sign(
    {
      id: userId,
      username: ourUser.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  // Connecter l'utilisateur en lui donnant un cookie
  cookies().set("ourhaikuapp", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  return {
    success: true,
  };
};
