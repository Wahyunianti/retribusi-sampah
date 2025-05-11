import { useState } from "react";
import { FiX } from "react-icons/fi";

interface ICustomModal {
    onClose: () => void;
    onSearch: (searchValue: string) => void;
}

const SearchModal = (props: ICustomModal) => {

    const [search, setSearch] = useState<string>('')

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleValue = () => {
        props.onSearch(search)
        props.onClose
    }
    return (
        <>
            <div className="flex flex-col w-min h-full gap-2 pt-3 animate-slide-up">
                <form action={handleValue}>
                <div className="w-full h-min flex justify-end px-3">
                    <FiX
                        onClick={props.onClose}
                        className="w-6 h-6 cursor-pointer text-red-600" />
                </div>
                <div className="w-full h-min">
                    <p className="title text-lg text-center">Cari Wajib Retribusi</p>
                </div>
                <div className="w-full h-min py-5 grid place-items-center">
                    <input
                    onChange={handleSearch}
                        className="h-10 w-56 md:w-72 placeholder text-sm bg-white text-red-400 rounded-md px-4 border border-red-400 mx-3 outline-none focus:ring-0 focus:border-red-400"
                        type="text"
                        placeholder="Ketik wajib retribusi.."
                    />
                </div>
                <div className="w-full h-min pb-5 grid place-items-center">
                    <button 
                    onClick={handleValue}
                    type="submit"
                    className="bg-red-400 text-white text-xl title px-5 py-1 rounded-md hover:bg-red-500 cursor-pointer">Search</button>
                </div>
                </form>
            </div>
        </>
    )
};

export default SearchModal;