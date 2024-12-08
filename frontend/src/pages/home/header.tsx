import React, { useEffect, useState } from "react"
import { 
    LogoWrapper,
    LogoText,
    HeaderSection
} from "../../components/StyledComponent/home"
import ToggleBtn from "../../components/ToggleBtn/ToggleBtn";
import { useTheme } from "../../ThemeContext"
import { FiLogOut } from 'react-icons/fi';
import logo from "../../assets/logo.png"
import { AlignItems } from "../../components/StyledComponent/user";
import auth from "../../api/auth/auth-helper";
import { useNavigate } from "react-router-dom";

const Logo = () => (
    <LogoWrapper>
        <img src={logo} alt="logo" className="logo" />
        <LogoText>To-Do</LogoText>
    </LogoWrapper>
)

const Header = () => {
    const navigate = useNavigate()
    const {theme, toggleTheme} = useTheme()
    const [checked, setChecked] = useState<boolean>(theme === "light" ? false : true)

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
        toggleTheme();
    }

    const handleLogOut = ():void => {
        auth.clearJWT(() => navigate('/'));
    }

    return(
        <HeaderSection style={{borderBottom: "1px solid var(--text-color)"}}>
            <Logo />
            <AlignItems style={{gap: "20px"}}>
                <ToggleBtn handleChange={handleChange} checked={checked} />
                <FiLogOut onClick={handleLogOut} style={{color: "var(--text-color)", cursor: "pointer"}} size={30} />
            </AlignItems>
        </HeaderSection>
    )
}

export default Header