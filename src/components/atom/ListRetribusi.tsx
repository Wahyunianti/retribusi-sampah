import { RupiahUtility } from "../../utility/rupiah.utility";
import { IBulan, ITahun, StatusBayar, StatusToko } from "../../interface/retribusi.types";
import SVG from 'react-inlinesvg';
import { ASSETS_URL } from '../../constant/assets.url';


interface ICustomModal {
    title: string;
    nominal: number | 20000;
    bulan?: boolean;
    perbulan?: IBulan | any;
    pertahun?: ITahun | any;
    isRetribusi?: boolean;
    onClick?: () => void;
    onBuka?: () => void;
}

const rupiahUt = new RupiahUtility();

const ListRetribusi = (props: ICustomModal) => {

    return (
        <>
            <div className="h-20 w-full grid place-items-center px-2 mt-5 cursor-pointer animate-fade-in delay-200">
                <div className="bg-white border-y border-red-300 w-full h-full flex flex-row px-0 lg:px-72">
                    <div className="w-full text-red-500 flex flex-col justify-center placeholder text-sm px-2">
                        {props.title}
                    </div>
                    <div className="w-full text-red-500 grid place-items-center placeholder text-sm">
                        {rupiahUt.number(props.nominal)}
                    </div>
                    <div className="w-full text-red-500 flex flex-col items-center justify-center placeholder text-sm">
                        {props.bulan ? <>
                            <div>
                                <p className="text-xs">{rupiahUt.bulan(props.perbulan?.bulan)}</p>
                                <p className={`${(props.perbulan?.status == 0 ? 'bg-red-300' : 'bg-blue-300')} text-sm w-max px-2 py-1 text-white font-medium rounded-md`}>
                                    {(props.perbulan?.status == 0 ? StatusBayar[0] : StatusBayar[1])}</p>
                            </div>
                        </> : <>
                            <div
                            onClick={props.isRetribusi ? props.onBuka : undefined}
                            className="cursor-pointer"
                            >
                                <p className="text-xs">status</p>
                                <p className={`${(props.pertahun?.status == 0 ? 'bg-rose-300' : 'bg-violet-300')} text-sm w-max px-2 py-1 text-white font-medium rounded-md`}>
                                    {(props.pertahun?.status == 0 ? StatusToko[0] : StatusToko[1])}
                                </p>
                            </div>
                        </>}
                    </div>
                    {props.isRetribusi &&
                        <div 
                        onClick={props.onClick}
                        className="w-14 grid place-items-center placeholder text-sm">
                            <SVG
                                src={ASSETS_URL.ICON.REMOVE}
                                className="w-7 h-7 mx-2 cursor-pointer z-10 animate-slide-up icons" />
                        </div>}
                </div>
            </div>
        </>
    )
};

export default ListRetribusi;