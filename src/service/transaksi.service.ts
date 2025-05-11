import { HttpService } from "./http.service";
import { getUrl, Tambah } from "../interface/transaksi.types";

const http = new HttpService()

export const getTransaksi = async ({search= "", page = 1, size = 10, karcis_id = 0, bulan_id = 1} : getUrl) => {
  try {
    const response = await http.GET("transaksi", { search, page, size, karcis_id, bulan_id });
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengambil data transaksi");
  }
};

export const deleteTransaksi = async ({id = ""}:{id : string}) => {
  try {
    const response = await http.DELETE(`transaksi/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal delete data");
  }
};

export const addTransaksi = async ({retribusi_id=0, tgl_bayar=""} : Tambah) => {
  try {
    const response = await http.POST<Tambah>("tambah-transaksi", {retribusi_id, tgl_bayar});
    return response.data;
  } catch (error) {
    throw new Error("Gagal tambah data");
  }
};


