import { useEffect, useState } from 'react';
import Modals from '../components/atom/Modals';
import ListRetribusi from '../components/atom/ListRetribusi';
import SearchModal from '../components/retribusi/SearchModal';
import { useRetribusi } from '../hooks/retribusi/useRetribusi';
import TambahModal from '../components/retribusi/TambahModal';
import EditTaxModal from '../components/retribusi/EditTaxModal';

const Retribusi = () => {
    const { handleSearch, handleDelete, dataRetribusi, hasMore, lastItemRef , reloadData, loading2} = useRetribusi();
    const [searchValue, setSearch] = useState<string>('');
    const [modal, showModal] = useState<boolean>(false);
    const [ubah, showUbah] = useState<boolean>(false);
    const [hapus, showHapus] = useState<boolean>(false);
    const [buka, showBuka] = useState<boolean>(false);
    const [retId, setRetId] = useState<number>(0);
    const [stt, setStatus] = useState<number>(0);


    const handleShowSearch = () => {
        showUbah(false)
        showHapus(false)
        showBuka(false)
        showModal(true)
    }

    const handleTambah = () => {
        showUbah(true)
        showHapus(false)
        showBuka(false)
        showModal(true)
    }

    const handleHapus = () => {
        showUbah(false)
        showHapus(true)
        showBuka(false)
        showModal(true)
    }

    const handleBuka = () => {
        showUbah(false)
        showHapus(false)
        showBuka(true)
        showModal(true)
    }

    const handleSearchChange = (searchValue: string) => {
        handleSearch(searchValue);
        setSearch(searchValue)
        showModal(false)
    };

    const handleTambahSubmit = async () => {
        await reloadData(); 
      };
      
    const handleSubmitChange = () => {
        handleDelete(retId.toString())
        showModal(false)
        return true
    }


    useEffect(() => {
        if (dataRetribusi.length > 0) {
        }
    }, [dataRetribusi]);

    return (<>
        <div className="h-min py-3 w-full flex flex-row items-center justify-between placeholder mt-5 px-5">
            <p className='font-medium text-red-500'>Data Retribusi</p>
            <button
            onClick={handleTambah}
            className='bg-red-400 cursor-pointer font-medium text-white px-4 py-1 rounded-md'>Tambah</button>
        </div>
        <div className="h-min py-2 w-full grid place-items-center">
            <input
                onClick={handleShowSearch}
                readOnly
                className="h-10 w-72 placeholder text-sm bg-white text-red-400 rounded-md px-4 border border-red-400 outline-none focus:ring-0 focus:border-red-400 cursor-pointer"
                type="text"
                placeholder="Search"
                value={searchValue}
            />
        </div>
        {
            dataRetribusi.map((item, index) => (
                <li onClick={() => {setRetId(item.id); setStatus(item.status)}} className='list-none animate-slide-up' key={`${item.id}-${index}`} ref={index === dataRetribusi.length - 1 ? lastItemRef : null}>
                    <ListRetribusi
                        title={item.wajib_retribusi}
                        nominal={item.nominal}
                        bulan={false}
                        pertahun={{status: item.status}}
                        isRetribusi={true}
                        onClick={handleHapus}
                        onBuka={handleBuka}
                    />
                </li>
            ))}
        {loading2 &&
            <div className='w-full h-[38px] placeholder animate-pulse text-xs text-red-400 flex flex-row items-center justify-center'>
                loading.. <span className="w-3 h-3 border-2 border-t-transparent border-red-400 rounded-full animate-spin z-10"></span>
            </div>
        }
        {!hasMore &&
            <div className='w-auto mx-2 mb-24 h-[38px] placeholder text-xs border border-red-100 rounded-md text-red-400 flex flex-row items-center justify-center mt-2'>
                Tidak ada data lagi
            </div>
        }

        {modal &&
            <div className={`${modal ? 'animate-fade-in' : 'animate-fade-out'} z-50 absolute w-full h-full top-0 transition-all`}>
                <Modals
                    onClose={() => showModal(false)}
                >
                    {ubah ?
                        <TambahModal onClose={() => showModal(false)} onSubmit={handleTambahSubmit}/>
                        : hapus || buka ? 
                        <EditTaxModal onClose={() => {showModal(false); reloadData()}} status={buka ? 3 : 2} ret_id={retId.toString()} ret_stt={stt} onClick={() => handleSubmitChange()} />
                        :
                        <SearchModal onClose={() => showModal(false)} onSearch={handleSearchChange} />
                    }
                </Modals>
            </div>
        }
    </>);

};

export default Retribusi;