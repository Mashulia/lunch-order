import { registerUser } from "@/api/auth.api";
import { form, registerState, v$ } from "./model";
import router from "@/router";
import { user, token } from "../../commonState/store";
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
    user.value = response.user;
    resetForm();
    registerState.isRegisterSuccess = true;
    setTimeout(() => {
      registerState.isRegisterSuccess = false;
    }, 1000);
    router.push("/menu-order");
    v$.value.$reset();
  } catch (error) {
    console.log(error);
    registerState.isRegisterFailed = true;
    setTimeout(() => {
      registerState.isRegisterFailed = false;
    }, 1000);
  }
};

export const logout = () => {
  token.value = null;
  localStorage.removeItem("jwtToken");
  router.push("/login");
};
