import { useAuth } from '../../helpers/checkAuth'
import NavRoutes from './navRoutes'
import './navbar.scss'

export default function Navbar(){
    const auth = useAuth()
    return (
        <div id="app-nav">
            <div id="app-brand">
                GameHub
            </div>
                <NavRoutes authStatus={auth !== undefined}></NavRoutes>
        </div>
    )
}