import axios from "axios";
import { axiosInstance } from "./config";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Failed to fetch users");
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await axiosInstance.delete(`users/${userId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error deleting user:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to delete user");
    } else {
      console.error("Error deleting user:", error.message);
      throw error;
    }
  }
};
