import { useState, useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Retribusi } from "../../interface/retribusi.types";
import { fetchRetribusi } from "../../store/slice/retribusi.slice";
import { tambahRetribusi } from "../../store/slice/retribusi.slice";
import { RetribusiTambah } from "../../interface/transaksi.types";
import { delRetribusi } from "../../store/slice/retribusi.slice";
import Swal from "sweetalert2";
import { editRetribusi } from "../../store/slice/retribusi.slice";

export function useRetribusi() {
  const dispatch = useAppDispatch();
  const { loading2 } = useAppSelector((state) => state.retribusi);

  const [dataRetribusi, setDataRetribusi] = useState<Retribusi[]>([]);
  const [page, setPage] = useState(1);
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
      const response = await dispatch(fetchRetribusi({ search, page, size }));
      const newData = (response.payload as { data: Retribusi[] }).data;

      if (newData.length > 0) {
        setDataRetribusi((prevData) => (page === 1 ? newData : [...prevData, ...newData]));
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setIsFetching(false);
  };

  const reloadData = async () => {
    setIsFetching(true);
    setPage(1);
    setHasMore(true);

    try {
      const response = await dispatch(fetchRetribusi({ search, page: 1, size }));
      const newData = (response.payload as { data: Retribusi[] }).data;
      setDataRetribusi(newData);
    } catch (error) {
      console.error("Error reloading data:", error);
    }
  
    setIsFetching(false);
  };

    const handleDelete = (id: string) => {
      dispatch(delRetribusi({ id }))
        .unwrap()
        .then(() => {
          Swal.fire({
            title: "Berhasil!",
            text: "Data berhasil dihapus.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          reloadData()
        })
        .catch(() => alert("Gagal menghapus data."));
    };

    const handleUpdate = (id: string, status: number) => {
      dispatch(editRetribusi({ id, status }))
        .unwrap()
        .then(() => {
          Swal.fire({
            title: "Berhasil!",
            text: "Data berhasil disimpan.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          
          setPage(1);      
          setHasMore(true);  
          setDataRetribusi([]);     
          loadMoreData();   
        })
        .catch(() => alert("Gagal mengupdate data."));
    };


  const handleSubmit = ({ karcis_id = 1, wajib_retribusi = "" }: RetribusiTambah) => {
    dispatch(tambahRetribusi({ wajib_retribusi, karcis_id }))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Berhasil!",
          text: "Data Retribusi Ditambahkan.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        reloadData()
      })
      .catch(() => alert("Gagal menyimpan retribusi"));
  };

  useEffect(() => {
    loadMoreData();
  }, [dispatch, page, search]);

  useEffect(() => {
    setDataRetribusi([]);
    setPage(1);
    setHasMore(true);
  }, [search]);

  const handleSearch = (value: string) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  };


  return {
    dataRetribusi,
    lastItemRef,
    loading2,
    setDataRetribusi,
    handleSearch,
    handleSubmit,
    handleDelete,
    handleUpdate,
    hasMore,
    reloadData,
  };
}
