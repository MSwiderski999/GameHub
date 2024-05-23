import './colorChangeUI.scss'

interface ColorChangeUIProps{
    targetCardID: number,
    nextFunction: (id: number, selectedColor: string | null) => void,
}

export default function ColorChangeUI(props: ColorChangeUIProps){
    return(
        <div className="con">
            <div className="b choice" onClick={() => props.nextFunction(props.targetCardID, "blue")}/>
            <div className="g choice" onClick={() => props.nextFunction(props.targetCardID, "green")}/>
            <div className="r choice" onClick={() => props.nextFunction(props.targetCardID, "red")}/>
            <div className="y choice" onClick={() => props.nextFunction(props.targetCardID, "yellow")}/>
        </div>
    )
}