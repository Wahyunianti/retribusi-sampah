import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Karcis } from "../../interface/retribusi.types";
import { fetchKarcis } from "../../store/slice/karcis.slice";

export function useKarcisList() {
    const dispatch = useAppDispatch();
    const { loading2 } = useAppSelector((state) => state.karcis);

    const [data2, setData] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {

            try {
                const response = await dispatch(fetchKarcis(''));
                const newData = (response.payload as Karcis[]);
                setData(newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        loadData();
    }, [dispatch]);

    return {
        data2,
        loading2
    };
}
