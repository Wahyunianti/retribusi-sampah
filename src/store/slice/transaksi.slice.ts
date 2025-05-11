import { getStateTransaksi } from "../../interface/state.types";
import { SliceService } from "../service/redux.slice.service";
import { getTransaksi, deleteTransaksi,addTransaksi } from "../../service/transaksi.service";
import { Transaksi, getUrl, Tambah } from "../../interface/transaksi.types";

const initialState: getStateTransaksi = {
  data: [],
  loading: false,
  error: null,
};

const service = new SliceService();

export const fetchTransaksi = service.fetchAPI<getUrl, Transaksi[]>(
    "transaksi/fetch",
    getTransaksi
);

export const delTransaksi = service.fetchAPI<{id: string}, {message: string}>(
  "transaksi/delete",
  deleteTransaksi
);

export const tambahTransaksi = service.fetchAPI<Tambah, Tambah[]>(
  "transaksi/add",
  addTransaksi
);

export const transaksiSlice = service.sliceData("transaksi", initialState, fetchTransaksi);
export const deleteSlice = service.sliceData("transaksidelete", initialState, delTransaksi);
export const tambahSlice = service.sliceData("transaksitambah", initialState, tambahTransaksi);

export const transaksiReducer = transaksiSlice.reducer;
export const deleteTransaksiReducer = deleteSlice.reducer;
export const tambahTransaksiReducer = tambahSlice.reducer;

