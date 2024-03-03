import axios from "axios";
import { axiosInstance } from "./config";
import { token } from "@/commonState/store";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await axiosInstance.delete(`users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error deleting user:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to delete user");
    } else {
      throw new Error("Error deleting user");
    }
  }
};

export const updateUser = async (userId: number, userData: any) => {
  console.log(userData);
  try {
    const response = await axiosInstance.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error updating user:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to update user");
    } else {
      throw new Error("Error updating user");
    }
  }
};
