import { configureStore } from '@reduxjs/toolkit'
import retribusiReducer from "./slice/retribusi.slice";
import {transaksiReducer, deleteTransaksiReducer, tambahTransaksiReducer} from "./slice/transaksi.slice";
import karcisReducer from "./slice/karcis.slice";
import bulanReducer from "./slice/bulan.slice";


export const store = configureStore({
  reducer: {
    retribusi: retribusiReducer,
    transaksi: transaksiReducer,
    delete: deleteTransaksiReducer,
    tambah: tambahTransaksiReducer,
    karcis: karcisReducer,
    bulan: bulanReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;