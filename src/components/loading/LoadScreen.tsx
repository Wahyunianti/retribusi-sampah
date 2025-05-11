import SVG from "react-inlinesvg";
import { ASSETS_URL } from "../../constant/assets.url";

export const LoadScreen = () => {
    return <>
            <div className="bg-red-300 w-full h-dvh z-50">
                <div className="bg-red-400 relative w-full h-full flex flex-col gap-24 items-center pt-36">
                    <h1 className="title text-5xl text-white animate-slide-up">
                        E-RETRIBUSI
                    </h1>
                    <SVG
                        src={ASSETS_URL.ILLUSTRATION.LOADING}
                        className="w-24 h-24 cursor-pointer z-10 animate-slide-up" />
                    <div className="w-12 h-12 border-4 border-t-transparent border-red-400 rounded-full animate-spin z-10"></div>

                    <div className="absolute bg-white h-1/2 w-screen bottom-0 rounded-t-full">
                    </div>
                </div>
            </div>
    </>;
}
