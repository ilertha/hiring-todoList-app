import styled from "styled-components"

const HomeBackground = styled.div`
    background: var(--background-color);
    background-image: url("https://uploads-ssl.webflow.com/62e3ee10882dc50bcae8d07a/631a5d4631d4c55a475f3e34_noise-50.png");
    width: 100%;
    min-height: 100vh;
    [data-theme="dark"] & {
        background-image: none;
        background-color: var(--background-color);
    }
`

const HomeWrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: auto;
    padding: 0 10px;
`

const LogoWrapper = styled.div`
    background: var(--background-color);
    display: flex;
    justify-content: space-between;
    width: 200px;
    align-items: center;
    padding: 8px;
    background-image: url("https://uploads-ssl.webflow.com/62e3ee10882dc50bcae8d07a/631a5d4631d4c55a475f3e34_noise-50.png");
    [data-theme="dark"] & {
        background-image: none;
        background-color: var(--background-color);
    }
    @media (max-width: 768px){
        height: 50px;
        width: 120px;
    }
`

const LogoText = styled.div`
    font-size: 36px;
    font-weight: 800;
    color: var(--text-color);

    @media (max-width: 768px){
        font-size: 20px;
    }
`

const LogoImg = styled.img`
    width: 30px;
    height: 50px;
`

const HeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 88px;
    @media (max-width: 768px){
        height: 50px;
    }
`

const ToDoBody = styled.div`
    padding: 15px 0;
`

const CardWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`

const TaskCard = styled.div`
    border: 1px solid var(--text-color);
    border-radius: 5px;
    width: 330px;
    height: 150px;
    padding: 15px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const MiddleSectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    @media (max-width: 624px){
        flex-direction: column;
    }
`

export {
    HomeBackground,
    HomeWrapper,
    LogoWrapper,
    LogoText,
    LogoImg,
    HeaderSection,
    ToDoBody,
    CardWrapper,
    TaskCard,
    MiddleSectionWrapper
}