import './winMessage.scss'

interface WinMessageProps{
    turns: number
    time: string
    visible: boolean
}

export default function WinMessage(props: WinMessageProps){
    return(
        <div className={"win-message"}>
            <h1 className="title">You won!</h1>
            <p>Turns: {props.turns}</p>
            <p>Time: {props.time}</p>
        </div>
    )
}