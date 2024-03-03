import axios from "axios";
import { CreateUserDto } from "@/types";
import { axiosInstance } from "./config";

export const registerUser = async (userData: CreateUserDto) => {
  try {
    const response = await axiosInstance.post("/auth/registration", userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      throw new Error(
        axiosError.response?.data?.message || "Failed to register user"
      );
    } else {
      throw new Error("Error regestering");
    }
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error("Error login");
  }
};
