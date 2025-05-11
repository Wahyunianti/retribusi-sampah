import { getRetribusi } from "../../service/retribusi.sevice";
import { getUrl, Retribusi } from "../../interface/retribusi.types";
import { RetribusiTambah } from "../../interface/transaksi.types";
import { getStateRetribusi } from "../../interface/state.types";
import { SliceService } from "../service/redux.slice.service";
import { addRetribusi } from "../../service/retribusi.sevice";
import { deleteRetribusi } from "../../service/retribusi.sevice";
import { updateRetribusi } from "../../service/retribusi.sevice";

const initialState: getStateRetribusi = {
  data: [],
  loading2: false,
  error: null,
};

const service = new SliceService();

export const fetchRetribusi = service.fetchAPI<getUrl, Retribusi[]>(
    "retribusi/fetch",
    getRetribusi
);

export const tambahRetribusi = service.fetchAPI<RetribusiTambah, RetribusiTambah[]>(
  "retribusi/add",
  addRetribusi
);

export const delRetribusi = service.fetchAPI<{id: string}, {message: string}>(
  "retribusi/delete",
  deleteRetribusi
);

export const editRetribusi = service.fetchAPI<{id: string, status: number}, {message: string}>(
  "retribusi/update",
  updateRetribusi
);

export const retribusiSlice = service.sliceData("retribusi", initialState, fetchRetribusi);
export const tambahSlice = service.sliceData("retribusitambah", initialState, tambahRetribusi);
export const deleteSlice = service.sliceData("retribusidelete", initialState, delRetribusi);
export const updateSlice = service.sliceData("retribusiupdate", initialState, editRetribusi);



export default retribusiSlice.reducer;
export const retribusiReducer = tambahSlice.reducer;
export const deleteRetribusiReducer = deleteSlice.reducer;
export const updateRetribusiReducer = updateSlice.reducer;



