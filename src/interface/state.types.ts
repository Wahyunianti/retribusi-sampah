import { Retribusi } from "./retribusi.types";
import { Transaksi } from "./transaksi.types";

export interface getStateRetribusi {
    data: Retribusi[];
    loading2: boolean;
    error: string | null;
}

export interface getStateTransaksi {
    data: Transaksi[];
    loading: boolean;
    error: string | null;
}

export interface OptionType {
    value: string;
    label: string;
}

export interface BulanOption {
    value: string;
    label: string;
}