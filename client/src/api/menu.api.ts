import { user } from "@/commonState/store";
import { axiosInstance } from "./config";

export const uploadMenu = async (formData, supplierName) => {
  try {
    const response = await axiosInstance.post(
      `/upload-excel?supplierName=${supplierName}`,
      formData
    );
    if (response.status === 201) {
      console.log("Меню успешно загружено");
    } else {
      console.error("Ошибка при загрузке меню");
    }
  } catch (error) {
    throw new Error("Error upload menu");
  }
};

export const getMenu = async () => {
  try {
    const response = await axiosInstance.get("/menu", {
      params: {
        userId: user.value.id,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error getting menu");
  }
};
