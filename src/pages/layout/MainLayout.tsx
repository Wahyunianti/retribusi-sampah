import { Outlet, useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";

const MainLayout = () => {
    const navigate = useNavigate()

    return (
        <div className="relative overflow-x-hidden min-h-screen h-full">
            <div className='relative h-full w-screen'>
                <div className="bg-white w-full h-full animate-fade-in">
                    <div className="flex flex-col w-full h-full relative">
                        <div className="z-2 flex items-center justify-between h-20 px-5 bg-white shadow-md">
                            <IoWalletOutline
                            className="cursor-pointer"
                            onClick={() => navigate('/')}
                            size={32} color="red" />
                            <h1 className="title text-3xl text-red-500">
                                E-RETRIBUSI
                            </h1>
                            <IoAddCircleOutline
                            className="cursor-pointer"
                            onClick={() => navigate('/retribusi')}
                            size={34} color="red" />
                        </div>
                        <Outlet />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;