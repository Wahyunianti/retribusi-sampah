import React from "react";
import Select, { StylesConfig, SingleValue } from "react-select";

export interface OptionType {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: OptionType[];
    selectedOption: SingleValue<OptionType>;
    setSelectedOption: (option: SingleValue<OptionType>) => void;
}

const customStyles: StylesConfig<OptionType, false> = {
    control: (base) => ({
        ...base,
        backgroundColor: "#ffffff",
        cursor: "pointer",
        borderColor: "#FF7B7E",
        boxShadow: "none",
        fontSize: "14px",
        color: "#FF7B7E",
        "&:hover": { borderColor: "#FF7B7E" },
        "&:focus": { borderColor: "#ff0000", boxShadow: "none" },
    }),
    option: (base, { isSelected }) => ({
        ...base,
        backgroundColor: isSelected ? "#ffcccc" : "#ffffff",
        cursor: "pointer",
        fontSize: "14px",
        color: isSelected ? "#ffffff" : "#FF7B7E",
        "&:hover": { backgroundColor: "#FFA2A2", color: "#ffffff" },
    }),
    singleValue: (base) => ({
        ...base,
        color: "#FF7B7E",
        cursor: "pointer",
        boxShadow: "none"
    }),
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, selectedOption, setSelectedOption }) => {
    return (
        <div className="animate-fade-in">
            <Select options={options} value={selectedOption} onChange={setSelectedOption} styles={customStyles} />
        </div>);
};

export default CustomSelect;
