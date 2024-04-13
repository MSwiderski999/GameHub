import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Logout from './pages/Logout'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Uno from './pages/Uno'
import Footer from './components/Footer'
import Memory from './pages/Memory'

function App() {
  const [auth, setAuth] = useState({
    logged_in: localStorage.getItem("token") !== null,
    user: localStorage.getItem("token") + ""
  })
  return (
      <BrowserRouter>
      <Navbar auth={auth.logged_in}></Navbar>
      <Routes>
        <Route path="/login" element={<Login logged_in={auth.logged_in} setAuth={setAuth}/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/logout" element={<Logout setAuth={setAuth} logged_in={auth.logged_in}/>}></Route>
        <Route path="/uno" element={<Uno/>}></Route>
        <Route path="/memory" element={<Memory/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
