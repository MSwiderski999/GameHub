import FormContainer from "../../components/AccountForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../helpers/checkAuth";

export default function Logout(){

    const auth = useAuth()

    const navigate = useNavigate()
    const handleLogout = () => {

        axios.post("http://localhost:3000/logout")
        .then(res => {
            if(res.data.Status === "Success"){
                alert('sus')
                document.dispatchEvent(new CustomEvent("checkAuth"))
            }
        })
    }

    return (
        auth !== undefined
        ?
        <FormContainer>
            <form>
                <h1>Are you sure you want to log out?</h1>
                <button className="submit-btn" onClick={handleLogout}>Log out</button>
                <p><a href="/">Cancel</a></p>
            </form>
        </FormContainer>
        :
        <FormContainer>
            <form>
                <h1>You are logged out!</h1>
                <button className="info-btn" onClick={() => navigate('/')}>Return to homepage</button>
            </form>
        </FormContainer>
    )
}