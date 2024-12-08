import React from "react"
import "./togglebtn.css"
import { GoSun } from "react-icons/go"
import { PiMoonLight } from "react-icons/pi"

interface ToggleBtnProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({handleChange, checked }) => {
    return(
        <div className="toggleTheme">
            <i style={{marginTop: "3.5px"}}>
                <GoSun style={{ color: "var(--text-color)" }} />
            </i>
            <label className="switch" style={{ margin: "0 12px" }}>
                <input type="checkbox" onChange={handleChange} checked={checked} />
                <span className="slider round"></span>
            </label>
            <i style={{ marginTop: "3.5px" }}>
                <PiMoonLight style={{ color: "var(--text-color)" }} />
            </i>
        </div>
    )
}

export default ToggleBtn;