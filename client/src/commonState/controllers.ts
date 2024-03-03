import router from "@/router";
import { token } from "./store";

export const saveToken = (token: string) => {
  localStorage.setItem("jwtToken", JSON.stringify(token));
};

export const getToken = () => {
  const tokenValue = localStorage.getItem("jwtToken");
  if (tokenValue) {
    token.value = JSON.parse(tokenValue);
  } else {
    router.push("/login");
  }
};
