"use server";

function isAlphanumeric(str) {
  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(str);
}

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

  if (ourUser.username.length < 3) {
    errors.username =
      "Le nom d'utilisateur doit contenir au moins 3 caractères";
  }
  if (ourUser.username.length > 30) {
    errors.username =
      "Le nom d'utilisateur doit contenir au maximum 30 caractères";
  }

  if (errors.username || errors.password) {
    return {
      errors: errors,
      success: false,
    };
  }

  if (!isAlphanumeric(ourUser.username)) {
    errors.username =
      "Le nom d'utilisateur ne doit contenir que des lettres et des chiffres";
  }

  return {
    success: true,
  };
};
