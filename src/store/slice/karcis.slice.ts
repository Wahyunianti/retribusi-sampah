import { getKarcis } from "../../service/karcis.sevice";
import { Karcis } from "../../interface/retribusi.types";
import { getStateRetribusi } from "../../interface/state.types";
import { SliceService } from "../service/redux.slice.service";

const initialState: getStateRetribusi = {
  data: [],
  loading2: false,
  error: null,
};

const service = new SliceService();

export const fetchKarcis = service.fetchAPI<'',Karcis[]>(
    "karcis/fetch",
    getKarcis
);

export const karcisSlice = service.sliceData("karcis", initialState, fetchKarcis);

export default karcisSlice.reducer; 
