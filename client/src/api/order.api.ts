import { token, user } from "@/commonState/store";
import { axiosInstance } from "./config";
import { transformOrderData } from "@/pages/cart/controllers";

export const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post("/order", orderData);
    return response.data;
  } catch (error) {
    throw new Error("Error login");
  }
};

export const updateUserOrder = async (
  userId: number,
  orderDate: string,
  dishId: number,
  qty: number,
  isSmall: boolean
) => {
  const request = {
    dishId,
    orderDate,
    qty,
    isSmall,
  };
  try {
    const response = await axiosInstance.patch(`/order/${userId}`, request);
    transformOrderData(response.data);
  } catch (error) {
    throw new Error("Error updating order");
  }
};

export const deleteUserOrder = async (userId: number, dish: number) => {
  const request = {
    data: {
      dishId: dish,
    },
  };
  try {
    const response = await axiosInstance.delete(`/order/${userId}`, request);
    transformOrderData(response.data);
  } catch (error) {
    throw new Error("Error deleting order");
  }
};

export const getAllUserOrders = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/order/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error getting order");
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get(`/order`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error getting orders");
  }
};
