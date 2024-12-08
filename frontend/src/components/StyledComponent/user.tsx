import styled from "styled-components";
import authBackground from '../../assets/background.jpg'

const AuthBackground = styled.div`
    background-image: url(${authBackground});
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding-top: 200px;
`;

const AuthWrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: auto;
    display: flex;
    justify-content: center;
`;

const AuthContainer = styled.div`
    position: relative;
    max-width: 850px;
    width: 100%;
    background: #fff;
    padding: 40px 30px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    perspective: 2700px;
`;

const AuthLabel = styled.label`
    color: #41e2b8;
    cursor: pointer;

    &:hover {
    text-decoration: underline;
    }
`

const FormContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const FormTitle = styled.div`
    position: relative;
    font-size: 24px;
    font-weight: 500;
    color: #333;
`

const InputBoxes = styled.div`
    margin-top: 30px;
`

const InputBox = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    margin: 10px 0;
    position: relative;
`

const InputIcon = styled.i`
    position: absolute;
    color: #0fbc8f;
    font-size: 17px;
`

const AuthInput = styled.input`
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    padding: 0 30px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:focus,
    &:valid {
    border-color: #0fbc8f;
    }
`

const SubmitButton = styled.button`
    color: #fff;
    background: #0fbc8f;
    border-radius: 6px;
    padding: 0;
    cursor: pointer;
    transition: all 0.4s ease;
    border: none;
    width: 100%;
    height: 50px;

    &:hover {
    background: #004143;
    }
`

const SignUpText = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #333;
    text-align: center;
    margin-top: 25px;
`

const AuthBtnWrapper = styled.div`
    color: #fff;
    margin-top: 40px;
`

const AlignItems = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const SpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
`

export {
    AuthBackground, 
    AuthWrapper, 
    AuthContainer, 
    AuthLabel, 
    FormContent,
    FormTitle,
    InputBoxes,
    InputBox,
    InputIcon,
    AuthInput,
    SubmitButton,
    SignUpText,
    AuthBtnWrapper,
    AlignItems,
    SpaceBetween
}