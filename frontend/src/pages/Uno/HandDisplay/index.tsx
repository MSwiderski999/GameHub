import { ReactNode } from 'react'
import './hand.scss'

interface HandProps{
    children?: ReactNode
    rotated?: boolean
}

export default function Hand(props: HandProps){
    return(
        <>
        <div id='hand' className={props.rotated ? "rotated" : "vertical"}>
            {props.children}
        </div>
        </>
    )   
}