import axiosClient from "./axiosClient";

export const registerApi = (data: { email: string; password: string }) =>
  axiosClient.post("/auth/register", data);

export const loginApi = (data: { email: string; password: string }) =>
  axiosClient.post("/auth/login", data);
