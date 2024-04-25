import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Navbar from './components/Navbar'
import Uno from './pages/Uno'
import Footer from './components/Footer'
import Memory from './pages/Memory'
import CandyCrush from './pages/CandyCrush'
import Test from './pages/Test'

function App() {
  return (
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path="/uno" element={<Uno/>}></Route>
        <Route path="/memory" element={<Memory/>}></Route>
        <Route path="/candy-crush" element={<CandyCrush/>}></Route>
        <Route path="/test" element={<Test/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
