import { HttpService } from "./http.service";
import { getUrl } from "../interface/retribusi.types";
import { RetribusiTambah } from "../interface/transaksi.types";

const http = new HttpService()

export const getRetribusi = async ({search= "", page = 1, size = 10} : getUrl) => {
  try {
    const response = await http.GET("retribusi", { search, page, size });
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengambil data retribusi");
  }
};

export const addRetribusi = async ({wajib_retribusi="", karcis_id=1} : RetribusiTambah) => {
  try {
    const response = await http.POST<RetribusiTambah>("tambah-retribusi", {wajib_retribusi, karcis_id});
    return response.data;
  } catch (error) {
    throw new Error("Gagal tambah data");
  }
};

export const deleteRetribusi = async ({id = ""}:{id : string}) => {
  try {
    const response = await http.DELETE(`retribusi/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal delete data");
  }
};

export const updateRetribusi = async ({id = "", status = 0}:{id : string, status : number}) => {
  try {
    const response = await http.PUT(`update/${id}/${status}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal delete data");
  }
};