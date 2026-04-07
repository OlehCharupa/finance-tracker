import axiosClient from "./axiosClient";

export interface ExpenseFilters {
  from?: string;
  to?: string;
  categoryId?: string;
  sortBy?: "date" | "amount";
}

export const getExpenses = (filters?: ExpenseFilters) =>
  axiosClient.get("/expenses", { params: filters });

export const createExpense = (data: object) => axiosClient.post("/expenses", data);
export const updateExpense = (id: string, data: object) => axiosClient.put(`/expenses/${id}`, data);
export const deleteExpense = (id: string) => axiosClient.delete(`/expenses/${id}`);
