import { axiosInstance } from "./config";
import { token } from "@/commonState/store";

export const getSummary = async () => {
  try {
    const response = await axiosInstance.get(`/summary`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error getting summary");
  }
};
