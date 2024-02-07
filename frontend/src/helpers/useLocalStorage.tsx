import { useNavigate } from "react-router-dom"
import { setAuth, setUser } from "./userAuth"

export const useLocalStorage = () => {
    const navigate = useNavigate()
    const login = (user: string, password: string) => {
        window.localStorage.clear()
        window.localStorage.setItem(user, password)
        setUser(user)
        setAuth(true)
        navigate('/')
    }

    const logout = () => {
        window.localStorage.clear()
        setUser("")
        setAuth(false)
        navigate('/')
    }

    return { login, logout }
}