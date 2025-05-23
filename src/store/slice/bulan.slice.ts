import { createSlice } from "@reduxjs/toolkit";
import { OptionType } from "../../interface/state.types";

const Bulan = [
  { "value": "1", "label": "Januari" },
  { "value": "2", "label": "Februari" },
  { "value": "3", "label": "Maret" },
  { "value": "4", "label": "April" },
  { "value": "5", "label": "Mei" },
  { "value": "6", "label": "Juni" },
  { "value": "7", "label": "Juli" },
  { "value": "8", "label": "Agustus" },
  { "value": "9", "label": "September" },
  { "value": "10", "label": "Oktober" },
  { "value": "11", "label": "November" },
  { "value": "12", "label": "Desember" }
]

const initialState: OptionType[] = Bulan

const bulanSlice = createSlice({
  name: "bulan",
  initialState,
  reducers: {
    clearData: () => {
      return Bulan;
    },
  },
});

export const { clearData } = bulanSlice.actions;
export default bulanSlice.reducer;
