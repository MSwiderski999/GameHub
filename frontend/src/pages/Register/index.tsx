import React, { useEffect, useState } from "react";
import FormContainer from "../../components/AccountForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";

export default function Register(){
    const [values, setValues] = useState({
        email: "",
        username: "",
        password: "",
        repeatPassword: ""
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', values)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Account created succesfully!")
                navigate('/login')
            }else {
                alert("error")
            }
        })
        .then(err => console.log(err))
    }
    
    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h1>Create your Account</h1>
                <div className="input-container">
                    <p className="form-label"><strong>Email</strong></p>
                    <input type="email" placeholder="Enter email" name="email" onChange={(e) => setValues({...values, email: e.target.value})}/>
                </div>
                <div className="input-container">
                    <p className="form-label"><strong>Username</strong></p>
                    <input type="text" name="username" placeholder="Enter username" onChange={(e) => setValues({...values, username: e.target.value})}/>
                </div>
                <div className="input-container">
                    <p className="form-label"><strong>Password</strong></p>
                    <input type="password" placeholder="Enter password" name="password" onChange={(e) => setValues({...values, password: e.target.value})}/>
                </div>
                <div className="input-container">
                    <p className="form-label"><strong>Repeat password</strong></p>
                    <input type="password" placeholder="Enter password" name="repeat-password" onChange={(e) => setValues({...values, repeatPassword: e.target.value})}/>
                </div>
                <button type="submit" className="submit-btn">Register</button>
                <p>Already have an account? <a href="/login">Log in</a></p>
            </form>
        </FormContainer>
    )
}