import NavRoutes from './navRoutes'
import './navbar.scss'

interface NavbarProps{
    auth: boolean
}
export default function Navbar(props: NavbarProps){
    return (
        <div id="app-nav">
            <div id="app-brand">
                GameHub
            </div>
                <NavRoutes authStatus={props.auth}></NavRoutes>
        </div>
    )
}