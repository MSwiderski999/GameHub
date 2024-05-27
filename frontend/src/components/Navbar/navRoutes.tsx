import { Link } from "react-router-dom"

interface NavRoutesProps{
    authStatus: boolean
}
export default function NavRoutes(props: NavRoutesProps){
    if(props.authStatus){
        return (
            <div className="nav-list">
                <div className={"nav-item"} key={"Home"}><Link className={"nav-link"} to={"/"}>Home</Link></div>
                <div className={"nav-item"} key={"Profile"}><Link className={"nav-link"} to={"/profile"}>Profile</Link></div>
                <div className={"nav-item"} key={"Logout"}><Link className={"nav-link"} to={"/logout"}>Logout</Link></div>
                <div className={"nav-item"} key={"GitHub"}><Link target="_blank" className={"nav-link"} to={"https://github.com/MSwiderski999/GameHub"}>GitHub</Link></div>
            </div>
        )
    }else{
        return (
            <div className="nav-list">
                <div className={"nav-item"} key={"Home"}><Link className={"nav-link"} to={"/"}>Home</Link></div>
                <div className={"nav-item"} key={"Login"}><Link className={"nav-link"} to={"/login"}>Login</Link></div>
                <div className={"nav-item"} key={"Register"}><Link className={"nav-link"} to={"/register"}>Register</Link></div>
            </div>
        )
    }
}