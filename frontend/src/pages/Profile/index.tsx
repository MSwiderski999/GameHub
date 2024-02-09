import { useNavigate } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import auth from "../../helpers/userAuth";

export default function Profile(){
    const navigate = useNavigate()
    
    return (
        auth ?
        <MainContainer>

        </MainContainer>
        :
        navigate('/login')
    )
}