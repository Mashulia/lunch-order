import { loginUser } from "@/api/auth.api";
import { form, loginState } from "./model";
import { saveToken } from "../register/controllers";
import router from "@/router";
import { registerState } from "../register/model";
import { userRoles, token } from "../../commonState/store";
import { saveToken } from "../../commonState/controllers";

export const login = async () => {
  try {
    const response = await loginUser(form.value);
    if (response) {
      saveToken(response.token);
      loginState.isLoginSuccess = true;
      token.value = response.token;
      userRoles.value = response.userRole;
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};
