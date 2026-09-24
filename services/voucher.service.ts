import { api } from "@/libs/axios";

export const applyVoucherAPI = async (code: string) => {
  const response = await api.post("/vouchers/apply", { code });
  return response;
};