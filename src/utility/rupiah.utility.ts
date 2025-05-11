export class RupiahUtility {
    public number(number: number) {
        const rupiah = "Rp. "+number.toLocaleString("id-ID");
        return rupiah;
    }

    public bulan(tanggal: string | null | undefined) {
        if (!tanggal) return "Kosong";

        const bulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

        const parts = tanggal.split("-");
        if (parts.length !== 3) return "Format salah";

        const bulanIndex = parseInt(parts[1], 10) - 1;
        return bulan[bulanIndex] + " " + parts[0];
    }
}