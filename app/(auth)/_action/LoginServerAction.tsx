"use server";

const LoginServerAction = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("email", email, "password", password);
};

export default LoginServerAction;
