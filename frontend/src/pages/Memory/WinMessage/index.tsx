import { ReactNode } from 'react'
import './winMessage.scss'

interface WinMessageProps{
    turns: number
    time: string
    visible: boolean
    children?: ReactNode
}

export default function WinMessage(props: WinMessageProps){
    return(
        <div className={"win-message"}>
            <h1 className="title">You won!</h1>
            <p>Turns: {props.turns}</p>
            <p>Time: {props.time}</p>
            {props.children}
        </div>
    )
}