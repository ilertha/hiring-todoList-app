import styled from 'styled-components'

const SignUp = styled.section`
  margin-bottom: 150px;
  padding: 150px 0;
`

const SignUpContainer = styled.div`
  width: 900px;
  background: #fff;
  margin: 0 auto;
  box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  -o-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  -o-border-radius: 20px;
  -ms-border-radius: 20px;

  @media screen and (max-width: 1200px) {
    width: calc(100% - 30px);
    max-width: 100%;
  }

  @media screen and (min-width: 1024px) {
    max-width: 1200px;
  }
`

const SignUpContent = styled.div`
  padding: 50px 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    -moz-flex-direction: column;
    -webkit-flex-direction: column;
    -o-flex-direction: column;
    -ms-flex-direction: column;
    justify-content: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    -o-justify-content: center;
    -ms-justify-content: center;
  }

`

const SignUpForm = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  padding: 30px;
  display: flex;
  align-items: center;

  @media (max-width: 768px){
    flex-direction: column;
  }

  
  @media(max-width: 470px){
    padding: 0px;
  }
`

const SignUpLeftWrapper = styled.div`
  width: 50%;

  @media (max-width: 768px){
    width: 100%;
    text-align: center;
  }
`
const SignUpTitle = styled.h2`
  margin-bottom: 33px;
`

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 10px 0;
  position: relative;
`

const InputIconWrapper = styled.div`
  position: absolute;
  color: #6dabe4;
  font-size: 17px;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
`

const AuthInputForm = styled.input`
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  padding: 0 30px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid #6dabe4;
  transition: all 0.3s ease;

  &:focus,
  &:valid {
  border-color: #6dabe4;
  }
`

const RegisterButton = styled.button`
  display: inline-block;
  background: #6dabe4;
  color: #fff;
  border: none;
  width: auto;
  padding: 15px 39px;
  border-radius: 5px;
  margin-top: 25px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #4292dc;
  }
`
const AuthMainImg = styled.img`
  margin-left: 50px;
  @media (max-width: 768px){
    margin-left: 0px;
  }

  @media(max-width: 470px){
    width: 200px
  }
`

const AuthLink = styled.p`
  text-align: center;
  color: #6dabe4;
`

export {
  SignUp,
  SignUpContainer,
  SignUpContent,
  SignUpForm,
  SignUpLeftWrapper,
  SignUpTitle,
  FormGroup,
  AuthInputForm,
  InputIconWrapper,
  RegisterButton,
  AuthMainImg,
  AuthLink
}