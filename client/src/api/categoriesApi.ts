import axiosClient from "./axiosClient";

export const getCategories = () => axiosClient.get("/categories");
export const createCategory = (data: { name: string, icon?: string }) => axiosClient.post("/categories", data);
export const updateCategory = (id: string, data: { name: string, icon?: string }) => axiosClient.put(`/categories/${id}`, data);
export const deleteCategory = (id: string) => axiosClient.delete(`/categories/${id}`);
