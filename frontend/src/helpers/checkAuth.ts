import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import useInterval from 'react-useinterval'

const useAuth = () => {
    const [authId, setAuthId] = useState<number>()
    
    const verifyAuth = () => {
        const encoded = Cookies.get("login_token")
        setAuthId(encoded === undefined ? undefined : Number((<{id: string}>jwtDecode(encoded)).id))
    }

    useEffect(() => {
        verifyAuth()

        const handleCheck = () => verifyAuth()

        document.addEventListener('checkAuth', handleCheck)
        return () => document.removeEventListener('checkAuth', handleCheck)
    }, [])
    useInterval(verifyAuth, 2000)

    return authId
}

export { useAuth }