import React, { ReactElement } from "react";

interface HomeProps{
    children?: ReactElement
}

export default function Home(props: HomeProps){
    return (
        <h1>Home</h1>
    )
}