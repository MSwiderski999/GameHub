import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar loggedIn={true}></Navbar>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
