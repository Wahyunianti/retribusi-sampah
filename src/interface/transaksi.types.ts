export interface getUrl {
    search : string;
    page : number;
    size : number;
    karcis_id : number;
    bulan_id : number;
}

export interface Transaksi {
    id: number;
    ret_id: number;
    kar_id: number;
    wajib_retribusi: string;
    nominal: number;
    tgl_bayar: string;
    sudah_bayar: number;
    belum_bayar: number;
}

export interface Tambah {
    retribusi_id: number;
    tgl_bayar: string
}

export interface RetribusiTambah {
    wajib_retribusi: string;
    karcis_id: number;
}

export enum Bulan {
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
}