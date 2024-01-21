import { registerUser } from "@/api/auth.api";
import { form, registerState } from "./model";
import router from "@/router";

export const resetForm = () => {
  // Reset the form fields
  form.value = {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    password: "",
  };
};

export const saveToken = (token) => {
  localStorage.setItem("jwtToken", JSON.stringify(token));
};

const getToken = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    return JSON.parse(token);
  }
};

export const submitForm = async () => {
  try {
    // Call the createUser function with the form data
    const payload = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      middleName: form.value.middleName,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password,
    };
    const response = await registerUser(payload);
    saveToken(response.token);
    registerState.token = response.token;
    resetForm();
    registerState.isRegisterSuccess = true;
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  registerState.token = null;
  localStorage.removeItem("jwtToken");
};
