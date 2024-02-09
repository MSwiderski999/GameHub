import { ReactNode } from "react"
import './mainContainer.scss'

interface MainContainerProps{
    children?: ReactNode
}

export default function MainContainer(props: MainContainerProps){
    return (
        <div className="main-container">{props.children}</div>
    )
}