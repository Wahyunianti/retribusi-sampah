import { FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRetribusi } from "../../hooks/retribusi/useRetribusi";

interface ICustomModal {
    onClose: () => void;
    onClick: () => void;
    status: number;
    ret_id?: string;
    ret_stt?: number;
}

const EditTaxModal = (props: ICustomModal) => {
    const [enabled, setEnabled] = useState(true);
    const { handleUpdate } = useRetribusi();


    useEffect(() => {
        if (props.ret_stt !== undefined) {
            setEnabled(props.ret_stt == 1 ? true : false);
        }
    }, [props.ret_stt]);

    const handleUpdateStatus = (id: string) => {
        handleUpdate(id, enabled ? 0 : 1);
        setEnabled((prev) => !prev);
    };

    return (
        <>
            <div className="flex flex-col w-72 h-full gap-2 pt-3 animate-slide-up">
                <div className="w-full h-min flex justify-end px-3">
                    <FiX
                        onClick={props.onClose}
                        className="w-6 h-6 cursor-pointer text-red-600" />
                </div>
                <div className="w-full h-min">
                    {props.status == 1 || props.status == 0 ?
                        <p className="title text-lg text-center">Ubah Status Bayar</p>
                        : props.status == 2 ?
                            <p className="title text-lg text-center">Hapus Data Retribusi?</p> :
                            <p className="title text-lg text-center">Ubah Status {props.ret_stt ?? 1 ? 'Buka' : 'Tutup'}</p>
                    }
                </div>
                <div className="w-full h-min pb-5 grid place-items-center">
                    {props.status == 1 || props.status == 0 || props.status == 2 ?
                        <button
                            onClick={props.onClick}
                            className={`${props.status == 1 ? 'bg-green-400 focus:bg-green-600' : 'bg-red-400 focus:bg-red-600'} text-white text-xl title px-5 py-1 rounded-md  cursor-pointer`}>
                            {props.status == 1 ? 'LUNAS' : props.status == 0 ? 'BELUM LUNAS' : 'HAPUS'}
                        </button>
                        :
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleUpdateStatus(props?.ret_id ?? '')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-red-400' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                            <span className="text-md title text-red-400 font-bold">
                                {enabled ? 'BUKA' : 'TUTUP'}
                            </span>
                        </div>
                    }
                </div>

            </div>
        </>
    )
};

export default EditTaxModal;