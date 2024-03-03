import { loginUser } from "@/api/auth.api";
import { form, loginState, isFormEmailValid, v$ } from "./model";
import router from "@/router";
import { user, token } from "../../commonState/store";
import { saveToken } from "@/commonState/controllers";

const resetForm = () => {
  form.value = {
    email: "",
    password: "",
  };
};

export const login = async () => {
  try {
    const response = await loginUser(form.value);
    if (response) {
      loginState.isLoginSuccess = true;
      saveToken(response.token);
      token.value = response.token;
      user.value = response.user;
      loginState.isLoginSuccess = true;
      router.push("/menu-order");
      resetForm();
      v$.value.$reset();
    }
  } catch (error) {
    console.log(error);
    loginState.isLoginFailed = true;
  }
};
