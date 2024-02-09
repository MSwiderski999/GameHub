import { useState } from "react";
import FormContainer from "../../components/AccountForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

interface LoginProps{
    setAuth: React.Dispatch<React.SetStateAction<{
    logged_in: boolean;
    user: string;
    }>>,
    logged_in: boolean
}

export default function Login(props: LoginProps){
    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', values)
        .then(res => {
            if(res.data.Status === "Success"){
                props.setAuth({
                    logged_in: true,
                    user: values.email
                })
                localStorage.setItem("token", values.email + "|" + values.password)
            }else {
                alert(res.data.Message)
            }
        })
        .then(err => console.log(err))
    }

    return (
        !props.logged_in
        ?
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h1>Login to Your Account</h1>
                <div className="input-container">
                    <p className="form-label"><strong>Email</strong></p>
                    <input type="email" placeholder="Enter email" name="email" onChange={(e) => setValues({...values, email: e.target.value})}/>
                </div>
                <div className="input-container">
                    <p className="form-label"><strong>Password</strong></p>
                    <input type="password" name="password" placeholder="Enter password" onChange={(e) => setValues({...values, password: e.target.value})}/>
                </div>
                <button type="submit" className="submit-btn">Log in</button>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </form>
        </FormContainer>
        :
        <FormContainer>
            <form>
                <h1>You are logged in!</h1>
                <button className="info-btn" onClick={() => navigate('/')}>Return to homepage</button>
            </form>
        </FormContainer>
    )
}