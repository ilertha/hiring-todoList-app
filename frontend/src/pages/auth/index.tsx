import { 
    AuthBackground,
    AuthWrapper, 
    AuthContainer,
    FormContent,
} from "../../components/StyledComponent/user";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import frontImg from '../../assets/frontImg.jpg'
import backImg from '../../assets/backImg.jpg'
import './user.css'

const NextImg = (props: any) => (
    <div className={props.front}>
        <img className={props.imgClass} src={props.img} alt={props.alt} />
    </div>
)

const Auth = () => {
    return(
        <AuthBackground>
            <AuthWrapper>
                <AuthContainer>
                    <input type="checkbox" id="flip" />
                    <div className="cover">
                        <NextImg front="front" img={frontImg} alt="Front"/>
                        <NextImg front="back" imgClass="backImg" img={backImg} alt="Back"/>
                    </div>
                    <div className="forms">
                        <FormContent>
                            <SignInForm />
                            <SignUpForm />
                        </FormContent>
                    </div>
                </AuthContainer>
            </AuthWrapper>
        </AuthBackground>
    )
}

export default Auth;