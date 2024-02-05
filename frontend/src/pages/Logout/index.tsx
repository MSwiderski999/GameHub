import React from "react";
import FormContainer from "../../components/AccountForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
        .then(res => {
            if(res.data.Status === "Success"){
                navigate('/login')
            }else {
                alert("internal error")
            }
        }).catch(err => console.log(err))
    }

    return (
        <FormContainer>
            <form>
                <h1>Are you sure you want to log out?</h1>
                <button className="submit-btn" onClick={handleLogout}>Log out</button>
                <p><a href="/">Cancel</a></p>
            </form>
        </FormContainer>
    )
}