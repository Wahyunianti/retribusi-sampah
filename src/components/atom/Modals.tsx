import { useEffect, useState, ReactNode } from "react";

interface ICustomModal {
    onClose: () => void;
    children: ReactNode;
}

const Modals = ({ onClose, children }: ICustomModal) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <>
            <div className={`${isVisible ? 'visible' : 'hidden'} w-screen h-screen`}>
                <div className='flex flex-col items-center relative h-full pt-[30%] md:pt-[10%] w-full overflow-hidden'>
                    <div className='bg-white w-min h-min rounded-md z-[1000] p-4 fixed'>
                        {children}
                    </div>
                    <div
                        onClick={handleClose}
                        className='cursor-pointer fixed top-0 w-full h-full bg-slate-500 opacity-15'>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modals;
