import React from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Logout from "../pages/Logout";
import Uno from "../pages/Uno";

interface RouteElement{
    name : string,
    path : string,
    element : React.JSX.Element
}

export const routes: Array<RouteElement> = [
    { name: "Register", path: "/register", element: <Register/>},
    { name: "Login", path: "/login", element: <Login/>},
    { name: "Home", path: "/", element: <Home/>},
    { name: "Logout", path: "/logout", element: <Logout/>},
    { name: "Uno", path: "/uno", element: <Uno/>}
]