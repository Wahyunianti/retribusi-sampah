import { useEffect, useState } from 'react';
import CustomSelect from '../components/atom/CustomSelect';
import { SingleValue } from "react-select";
import Modals from '../components/atom/Modals';
import ListRetribusi from '../components/atom/ListRetribusi';
import { useKarcisList } from '../hooks/karcis/useKarcisList';
import { OptionType } from '../interface/state.types';
import { useSelector } from 'react-redux';
import { ASSETS_URL } from '../constant/assets.url';
import SVG from 'react-inlinesvg';
import SearchModal from '../components/retribusi/SearchModal';
import EditTaxModal from '../components/retribusi/EditTaxModal';
import { usePagination } from '../hooks/retribusi/usePagination';
import { RupiahUtility } from '../utility/rupiah.utility';
import { Bulan } from '../interface/transaksi.types';

enum IKrc {
    "value" = "0",
    "label" = "Pilih Karcis"
}

enum IBln {
    "value" = "0",
    "label" = "Pilih Bulan"
}

const rupiah = new RupiahUtility()

const Home = () => {
    const { data, lastItemRef, loading, hasMore, setBulan, setKarcis, handleSearch, handleDelete, handleSubmit, handleClears, bulan_id } = usePagination();
    const { data2, loading2 } = useKarcisList();
    const [optionBulan, setOptionBulan] = useState<OptionType[]>([]);
    const [selectedOption, setSelectedOption] = useState<any>([IKrc]);
    const [selectedOption2, setSelectedOption2] = useState<any>([IBln]);
    const [clearImage, setClearImage] = useState<boolean>(false);
    const [searchValue, setSearch] = useState<string>('');
    const [modal, showModal] = useState<boolean>(false);
    const [ubah, showUbah] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(0);
    const [retId, setRetId] = useState<number>(0);
    const [id, setId] = useState<string>("");
    const [tgl, setTgl] = useState<string>("2025-01-01");
    const [sudah, setSudah] = useState<number>(0);
    const [belum, setBelum] = useState<number>(0);

    const bulanList = useSelector((state: any) => state.bulan);

    const options: OptionType[] = data2
        ? data2.map((item) => ({
            value: item.id,
            label: item.jenis_karcis,
        }))
        : [];

    const handleClear = () => {
        setSelectedOption([IKrc])
        setSelectedOption2([IBln])
        setBulan(1)
        setSearch('')
        handleSearch('')
        setClearImage(false)
        handleClears()
    }

    const handleShowSearch = () => {
        showUbah(false)
        showModal(true)
    }

    function handleUbah(status: number, id: number, ret_id: number) {
        showUbah(true)
        showModal(true)
        setStatus(status)
        setId(String(id))
        setRetId(ret_id)
    }

    function handleBulan(bln: number) {
        const tahun: number | 2023 = new Date().getFullYear();
        const tgl_bayar: string = String(tahun) + '-0' + String(bln) + '-01'
        setTgl(tgl_bayar)
        return tgl_bayar
    }

    const handleSearchChange = (searchValue: string) => {
        handleSearch(searchValue);
        setSearch(searchValue)
        setClearImage(true)
        showModal(false)
    };

    const handleChangeKarcis = (option: SingleValue<OptionType>) => {
        setSelectedOption(option);
        setKarcis(option?.value ? parseInt(option.value, 10) : 0);
        setClearImage(true)
    };

    const handleChangeBulan = (option: SingleValue<OptionType>) => {
        setSelectedOption2(option);
        setBulan(option?.value ? parseInt(option.value, 10) : 1);
        handleBulan(option?.value ? parseInt(option.value, 10) : 1);
        setClearImage(true)
    };

    const handleSubmitChange = (status: number) => {
        if (status == 1) {
            handleDelete(id);
        } else {
            handleSubmit({ retribusi_id: retId, tgl_bayar: tgl })
        }
        showModal(false);
    }

    function handleBulanShow(value: number) {
        return Bulan[value - 1]
    }

    useEffect(() => {
        setOptionBulan(bulanList.map((bulan: any) => ({
            value: bulan.value,
            label: bulan.label,
        }))
        )
        if (data.length > 0) {
            setSudah(data[0]?.sudah_bayar);
            setBelum(data[0]?.belum_bayar);
        }
    }, [setOptionBulan, setBulan, data]);

    return (<>
        <div className="h-min w-full items-center grid self-center placeholder mt-5 px-5">
            <p className='font-medium text-red-500 text-center'>{handleBulanShow(bulan_id)}</p>
        </div>
        <div className="h-min py-5 w-full grid place-items-center mt-5">
            <input
                onClick={handleShowSearch}
                readOnly
                className="h-10 w-72 placeholder text-sm bg-white text-red-400 rounded-md px-4 border border-red-400 outline-none focus:ring-0 focus:border-red-400 cursor-pointer"
                type="text"
                placeholder="Search"
                value={searchValue}
            />
        </div>
        <div className="h-min py-2 w-full grid place-items-center">
            <div className="flex flex-row w-full md:w-1/2 px-3 h-full">
                <div className="w-full px-2 relative flex flex-col justify-center">
                    {loading2 ? <>
                        <div className='w-full h-[38px] placeholder bg-white border border-red-100 rounded-md animate-pulse text-xs text-red-400 flex flex-row items-center justify-center'>
                            loading.. <span className="w-3 h-3 border-2 border-t-transparent border-red-400 rounded-full animate-spin z-10"></span>
                        </div>
                    </> : <>
                        <CustomSelect options={options} selectedOption={selectedOption} setSelectedOption={handleChangeKarcis} />
                    </>}
                </div>
                <div className=" w-full px-2 relative flex flex-col justify-center">
                    {loading2 ? <>
                        <div className='w-full h-[38px] placeholder bg-white border border-red-100 rounded-md animate-pulse text-xs text-red-400 flex flex-row items-center justify-center'>
                            loading.. <span className="w-3 h-3 border-2 border-t-transparent border-red-400 rounded-full animate-spin z-10"></span>
                        </div>
                    </> : <>
                        <CustomSelect options={optionBulan} selectedOption={selectedOption2} setSelectedOption={handleChangeBulan} />
                    </>}
                </div>
                {clearImage && <SVG
                    onClick={handleClear}
                    src={ASSETS_URL.ICON.REMOVE}
                    className="w-10 h-10 mx-2 cursor-pointer z-10 animate-slide-up icons" />}

            </div>
        </div>

        {
            data.map((item, index) => (
                <li className='list-none animate-slide-up' onClick={() => handleUbah(item.tgl_bayar ? 1 : 0, item.id, item.ret_id)} key={`${item.id}-${index}`} ref={index === data.length - 1 ? lastItemRef : null}>
                    <ListRetribusi
                        title={item.wajib_retribusi}
                        nominal={item.nominal}
                        bulan={true}
                        perbulan={{ bulan: item.tgl_bayar, status: (item.tgl_bayar ? 1 : 0) }}
                    />
                </li>
            ))}
        {loading &&
            <div className='w-full h-[38px] placeholder animate-pulse text-xs text-red-400 flex flex-row items-center justify-center'>
                loading.. <span className="w-3 h-3 border-2 border-t-transparent border-red-400 rounded-full animate-spin z-10"></span>
            </div>
        }
        {!hasMore &&
            <div className='w-auto mx-2 mb-32 h-[38px] placeholder text-xs border border-red-100 rounded-md text-red-400 flex flex-row items-center justify-center mt-2'>
                Tidak ada data lagi
            </div>
        }

        <div className='fixed h-24 w-full z-[10] right-0 left-0 bottom-0 bg-white border-t border-slate-200 shadow-md flex flex-row items-center px-2 gap-2'>
            <div className='border placeholder text-blue-500 grid place-items-center border-slate-200 h-12 w-full rounded-md'>
                + {(rupiah.number(sudah))}
            </div>
            <div className='border placeholder text-red-500 grid place-items-center border-slate-200 h-12 w-full rounded-md'>
                - {(rupiah.number(belum))}
            </div>
        </div>
        {modal &&
            <div className={`${modal ? 'animate-fade-in' : 'animate-fade-out'} z-50 absolute w-full h-full top-0 transition-all`}>
                <Modals
                    onClose={() => showModal(false)}
                >
                    {ubah ?
                        <EditTaxModal onClose={() => showModal(false)} status={status} onClick={() => handleSubmitChange(status)} />
                        :
                        <SearchModal onClose={() => showModal(false)} onSearch={handleSearchChange} />
                    }
                </Modals>
            </div>
        }
    </>);

};

export default Home;