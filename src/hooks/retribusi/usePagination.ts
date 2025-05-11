import { useState, useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Transaksi, Tambah } from "../../interface/transaksi.types";
import { delTransaksi, fetchTransaksi, tambahTransaksi } from "../../store/slice/transaksi.slice";
import Swal from "sweetalert2";

export function usePagination() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.transaksi);

  const [data, setData] = useState<Transaksi[]>([]);
  const [page, setPage] = useState(1);
  const [bulan_id, setBulan] = useState(1);
  const [karcis_id, setKarcis] = useState(0);
  const [search, setSearch] = useState("");
  const size = 10;
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isFetching || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  const loadMoreData = async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    try {
      const response = await dispatch(fetchTransaksi({ search, page, size, karcis_id, bulan_id }));
      const newData = (response.payload as { data: Transaksi[] }).data;

      if (newData.length > 0) {
        setData((prevData) => (page === 1 ? newData : [...prevData, ...newData]));
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setIsFetching(false);
  };

  const handleDelete = (id: string) => {
    dispatch(delTransaksi({ id }))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Berhasil!",
          text: "Diubah ke belum bayar.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setPage(1);      
        setHasMore(true);  
        setData([]);     
        loadMoreData();    
      })
      .catch(() => alert("Gagal menyimpan transaksi"));
  };

  const handleSubmit = ({retribusi_id = 0, tgl_bayar = ""}:Tambah) => {
    dispatch(tambahTransaksi({retribusi_id, tgl_bayar}))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Berhasil!",
          text: "Diubah ke sudah bayar.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setPage(1);      
        setHasMore(true);  
        setData([]);     
        loadMoreData();    
      })
      .catch(() => alert("Gagal menyimpan transaksi"));
  };

  useEffect(() => {
    loadMoreData();
  }, [dispatch, page, bulan_id, karcis_id, search]);

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
  }, [bulan_id, karcis_id, search]);

  const handleSearch = (value: string) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  };

  const handleClears = () => {
    setBulan(1);
    setKarcis(0);
    setSearch("");
    return dispatch(fetchTransaksi({ search, page : 1, size: 10, karcis_id: 0, bulan_id : 1 }));
  };

  return {
    data,
    lastItemRef,
    loading,
    bulan_id,
    setBulan,
    setKarcis,
    setData,
    handleSearch,
    handleDelete,
    handleClears,
    handleSubmit,
    hasMore
  };
}
