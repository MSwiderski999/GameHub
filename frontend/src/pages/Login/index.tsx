import { useState } from "react";
import FormContainer from "../../components/AccountForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Login(){
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
                alert("Logged in succesfully!")
                navigate('/')
            }else {
                alert(res.data.Message)
            }
        })
        .then(err => console.log(err))
    }

    return (
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
    )
}