import { registerUser } from "@/api/auth.api";
import { form, registerState } from "./model";
import router from "@/router";
import { userRoles, token } from "../../commonState/store";
import { saveToken } from "../../commonState/controllers";

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
    token.value = response.token;
    userRoles.value = response.userRole;
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
