import { Link } from "react-router-dom"

export default function NavRoutes(authStatus : boolean){
    if(authStatus){
        return (
            <div className="nav-list">
                <div className={"nav-item"} key={"Home"}><Link className={"nav-link"} to={"/"}>Home</Link></div>
                <div className={"nav-item"} key={"Home"}><Link className={"nav-link"} to={"/"}>Profile</Link></div>
                <div className={"nav-item"} key={"Logout"}><Link className={"nav-link"} to={"/logout"}>Logout</Link></div>
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