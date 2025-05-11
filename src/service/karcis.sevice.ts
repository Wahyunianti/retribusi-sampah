import { HttpService } from "./http.service";
const http = new HttpService()

export const getKarcis = async () => {
  try {
    const response = await http.GET("karcis");
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengambil data karcis");
  }
};
