import { loginUser } from "@/api/auth.api";
import { form, loginState } from "./model";
import { saveToken } from "../register/controllers";
import router from "@/router";
import { registerState } from "../register/model";

export const login = async () => {
  try {
    const response = await loginUser(form.value);
    if (response) {
      saveToken(response.token);
      loginState.isLoginSuccess = true;
      registerState.token = response.token;
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};
