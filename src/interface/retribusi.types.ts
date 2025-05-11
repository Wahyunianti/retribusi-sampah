export interface getUrl {
    search : string;
    page : number;
    size : number;
}

export interface Retribusi {
    id: number;
    wajib_retribusi: string;
    nominal: number;
    status: number;
}

export interface Karcis {
    id: number;
    jenis_karcis: string;
    nominal: number | null;
}

export interface IBulan {
    bulan: string;
    status: number;
}

export interface ITahun {
    status: number;
}

export enum StatusBayar {
    "Belum Bayar",
    "Sudah Bayar"
}

export enum StatusToko {
    "TUTUP",
    "BUKA"
}

