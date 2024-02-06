import React, { useState } from "react";
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
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const [emptyEmailError, setEmptyEmailError] = useState(false)
    const [invalidEmailError, setInvalidEmailError] = useState(false)
    const [emptyUsernameError, setEmptyUsernameError] = useState(false)
    const [lengthUsernameError, setLengthUsernameError] = useState(false)
    const [emptyPasswordError, setEmptyPasswordError] = useState(false)
    const [lengthPasswordError, setLengthPasswordError] = useState(false)
    const [emptyRepeatPasswordError, setEmptyRepeatPasswordError] = useState(false)
    const [noMatchPasswordError, setNoMatchPasswordError] = useState(false)
    
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        var allowSend = true
        setEmptyEmailError(false)
        setInvalidEmailError(false)
        setEmptyUsernameError(false)
        setLengthUsernameError(false)
        setEmptyPasswordError(false)
        setLengthPasswordError(false)
        setEmptyRepeatPasswordError(false)
        setNoMatchPasswordError(false)

        if (values.email === "") { 
            setEmptyEmailError(true)
            allowSend = false 
        }
        else if (!values.email.match(regex)) {
            setInvalidEmailError(true)
            allowSend = false
        }

        if (values.username === "") {
            setEmptyUsernameError(true)
            allowSend = false 
        }
        else if (values.username.length > 20) {
            setLengthUsernameError(true)
            allowSend = false 
        }

        if (values.password === "") {
            setEmptyPasswordError(true)
            allowSend = false 
        }
        else if (values.password.length < 8) {
            setLengthPasswordError(true)
            allowSend = false 
        }

        if (values.repeatPassword === "") {
            setEmptyRepeatPasswordError(true)
            allowSend = false 
        }
        else if (values.password !== values.repeatPassword && !emptyPasswordError) {
            setNoMatchPasswordError(true)
            allowSend = false 
        }
        if (allowSend) {
            axios.post('http://localhost:3000/register', values)
            .then(res => {
                if(res.data.Status === "Success"){
                    alert("Account created succesfully!")
                    navigate('/login')
                }else {
                    alert("error")
                }
            })
            .catch(err => console.log(err))
        }
    }
    
    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h1>Create your Account</h1>
                <div className="input-container">
                    <p className="form-label"><strong>Email</strong></p>
                    <input type="email" placeholder="Enter email" name="email" onChange={(e) => setValues({...values, email: e.target.value})}/>
                    {emptyEmailError && <ErrorMessage content="Email is empty"/>}
                    {invalidEmailError && <ErrorMessage content="Invalid email format"/>}
                </div>
                <div className="input-container">
                    <p className="form-label"><strong>Username</strong></p>
                    <input type="text" name="username" placeholder="Enter username" onChange={(e) => setValues({...values, username: e.target.value})}/>
                    {emptyUsernameError && <ErrorMessage content="Username is empty"/>}
                    {lengthUsernameError && <ErrorMessage content="Username cannot have more than 20 characters"/>}
                </div>
                <div className="input-container">
                    <p className="form-label"><strong>Password</strong></p>
                    <input type="password" placeholder="Enter password" name="password" onChange={(e) => setValues({...values, password: e.target.value})}/>
                    {emptyPasswordError && <ErrorMessage content="Password is empty"/>}
                    {lengthPasswordError && <ErrorMessage content="Password must have at least 8 characters"/>}
                </div>
                <div className="input-container">
                    <p className="form-label"><strong>Repeat password</strong></p>
                    <input type="password" placeholder="Enter password" name="repeat-password" onChange={(e) => setValues({...values, repeatPassword: e.target.value})}/>
                    {emptyRepeatPasswordError && <ErrorMessage content="Repeat password is empty"/>}
                    {noMatchPasswordError && <ErrorMessage content="Passwords don't match"/>}
                </div>
                <button type="submit" className="submit-btn">Register</button>
                <p>Already have an account? <a href="/login">Log in</a></p>
            </form>
        </FormContainer>
    )
}