import { ReactNode } from 'react'
import './hand.scss'

interface HandProps{
    children?: ReactNode
}

export default function Hand(props: HandProps){
    return(
        <>
        <div id='hand'>
            {props.children}
        </div>
        </>
    )   
}