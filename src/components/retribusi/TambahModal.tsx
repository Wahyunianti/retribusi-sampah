import { useState } from "react";
import { FiX } from "react-icons/fi";
import CustomSelect from "../atom/CustomSelect";
import { useKarcisList } from "../../hooks/karcis/useKarcisList";
import { OptionType } from "../../interface/state.types";
import { SingleValue } from "react-select";
import { useRetribusi } from "../../hooks/retribusi/useRetribusi";

interface ICustomModal {
    onClose: () => void;
    onSubmit: () => void;
}

const IKrc: OptionType = {
    value: "0",
    label: "Pilih Karcis",
};

const TambahModal = (props: ICustomModal) => {
    const { data2 } = useKarcisList();
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(IKrc);
    const [wajibRetribusi, setWajibRetribusi] = useState("");
    const [error, setError] = useState("");
    const { handleSubmit } = useRetribusi();


    const options: OptionType[] = data2
        ? data2.map((item) => ({
            value: item.id,
            label: item.jenis_karcis,
        }))
        : [];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWajibRetribusi(e.target.value);
        setError("");
    };

    const handleSelectChange = (option: SingleValue<OptionType>) => {
        setSelectedOption(option);
        setError("");
    };
    const handleAddRetribusi = (e: React.FormEvent) => {
        e.preventDefault();

        if (!wajibRetribusi.trim()) {
            setError("Wajib Retribusi tidak boleh kosong!");
            return;
        }

        if (!selectedOption || selectedOption.value === "0") {
            setError("Silakan pilih karcis!");
            return;
        }

        const formData = {
            wajibRetribusi,
            selectedKarcis: selectedOption.value,
        };

        handleSubmit({ wajib_retribusi:formData.wajibRetribusi, karcis_id:parseInt(formData.selectedKarcis)})
        props.onClose();
        props.onSubmit();
    };

    return (
        <>
            <div className="flex flex-col w-min h-full gap-2 pt-3 animate-slide-up">
                <form onSubmit={handleAddRetribusi}>
                    <div className="w-full h-min flex justify-end px-3">
                        <FiX
                            onClick={props.onClose}
                            className="w-6 h-6 cursor-pointer text-red-600"
                        />
                    </div>
                    <div className="w-full h-min">
                        <p className="title text-lg text-center">Tambah Retribusi</p>
                    </div>
                    <div className="w-auto h-auto py-5">
                    {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

                        <input
                            className="h-10 w-auto placeholder text-sm bg-white text-red-400 rounded-md px-4 border border-red-400 mx-3 outline-none focus:ring-0 focus:border-red-400"
                            type="text"
                            placeholder="Wajib Retribusi"
                            value={wajibRetribusi}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full h-min mb-4 py-3 px-3 pt-0">
                        <CustomSelect
                            options={options}
                            selectedOption={selectedOption}
                            setSelectedOption={handleSelectChange}
                        />
                    </div>
                    <div className="w-full h-min pb-5 grid place-items-center">
                        <button
                            type="submit"
                            className="bg-red-400 text-white text-xl title px-5 py-1 rounded-md hover:bg-red-500 cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TambahModal;
