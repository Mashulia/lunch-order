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
    console.error("Ошибка при выполнении запроса:", error);
  }
};
