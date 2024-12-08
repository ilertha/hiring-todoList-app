import { 
    HomeBackground,
    HomeWrapper
} from "../../components/StyledComponent/home";
import Header from "./header";
import ToDo from "./ToDo";
import "./home.css"

const Home = () => {
    return(
        <HomeBackground>
            <HomeWrapper>
                <Header />
                <ToDo />
            </HomeWrapper>
        </HomeBackground>
    )
}

export default Home