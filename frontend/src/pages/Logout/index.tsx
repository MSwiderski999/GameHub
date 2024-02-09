import React from "react";
import FormContainer from "../../components/AccountForm";
import { useNavigate } from "react-router-dom";

interface LogoutProps{
    setAuth: React.Dispatch<React.SetStateAction<{
    logged_in: boolean;
    user: string;
    }>>,
    logged_in: boolean
}

export default function Logout(props: LogoutProps){
    const navigate = useNavigate()
    const handleLogout = () => {
        props.setAuth({
            logged_in: false,
            user: ""
        })
        localStorage.clear()
    }

    return (
        props.logged_in
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