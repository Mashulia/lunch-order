import axios from "axios";
import { CreateUserDto } from "@/types";
import { axiosInstance } from "./config";
import { registerState } from "@/pages/register/model";
import { loginState } from "@/pages/login/model";

export const registerUser = async (userData: CreateUserDto) => {
  try {
    const response = await axiosInstance.post("/auth/registration", userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      registerState.isRegisterSuccess = true;
      throw new Error(
        axiosError.response?.data?.message || "Failed to register user"
      );
    } else {
      registerState.isRegisterFailed = true;
      throw error;
    }
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    loginState.isLoginFailed = true;
    console.error(error.response.data);
  }
};
