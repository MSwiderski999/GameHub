import { ReactElement } from 'react'
import './gameForm.scss'

interface GameFormProps{
    children?: ReactElement
    onSubmit: ()=>{}
}
export default function GameForm(props: GameFormProps){
    return(
        <div id="form-container" role='form-container'>
        {props.children}
        <button onClick={props.onSubmit} id="submit">Play</button>
        </div>
    )
}