import styled from 'styled-components'
import { GoSun } from "react-icons/go"
import { PiMoonLight } from "react-icons/pi"
import { FiLogOut } from 'react-icons/fi'

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  border-bottom: 1px solid var(--primary-text-color);
  @media(max-width: 768px){
    height: 50px;
  }
`

const LogoTitle = styled.p`
  font-size: 36px;
  font-weight: 800;
  color: var(--primary-text-color);

  @media (max-width: 768px){
    font-size: 20px;
  }
`

const AlignItems = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DisplayFlex = styled.div`
  display: flex;
`

const ToggleThemeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SunIcon = styled(GoSun)`
  margin-top: 3.5px;
  color: var(--primary-text-color);
`;

const MoonIcon = styled(PiMoonLight)`
  margin-top: 3.5px;
  color: var(--primary-text-color);
`;

const LogOutIcon = styled(FiLogOut)`
  color: var(--primary-text-color);
  cursor: pointer;
  font-size: 30px;
`

const SwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 28px;
  height: 16px;
  margin: 0 12px;
  border: 1px solid var(--primary-text-color);
  border-radius: 16px;
`;

const SwitchInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  transition: 0.4s;
  border-radius: 16px;

  &::before {
    background-color: var(--primary-text-color);
    position: absolute;
    height: 12px;
    width: 12px;
    left: 2px;
    bottom: 2px;
    content: "";
    transition: 0.4s;
    border-radius: 50%;
  }

  ${SwitchInput}:focus + & {
    box-shadow: 0 0 1px #2196f3;
  }

  ${SwitchInput}:checked + &::before {
    transform: translateX(12px);
  }
`;

const LogoImg = styled.img`
  width: 80px;
  height: 80px;

  @media(max-width: 768px){
    width: 50px;
    height: 50px;
  }
`

export {
  HeaderSection,
  LogoTitle,
  AlignItems,
  SpaceBetween,
  DisplayFlex,
  ToggleThemeWrapper,
  SunIcon,
  MoonIcon,
  SwitchWrapper,
  SwitchInput,
  Slider,
  LogOutIcon,
  LogoImg,
}