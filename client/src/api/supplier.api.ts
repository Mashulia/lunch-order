import { axiosInstance } from "./config";

export const createSupplier = async (supplierData) => {
  const payload = {
    name: supplierData,
  };
  try {
    const response = await axiosInstance.post(`/suppliers`, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating supplier:", error.message);
    throw error;
  }
};

export const deleteSupplier = async (supplierId) => {
  try {
    const response = await axiosInstance.delete(`/suppliers/${supplierId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting supplier:", error.message);
    throw error;
  }
};

export const getAllSuppliers = async () => {
  try {
    const response = await axiosInstance.get(`/suppliers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error.message);
    throw error;
  }
};
