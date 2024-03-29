import { ReactNode } from 'react'
import './hand.scss'

interface HandProps{
    children?: ReactNode
    rotated?: boolean
    player?: boolean
}

export default function Hand(props: HandProps){
    let handProps = []
    handProps.push(props.rotated ? "horizontal" : "vertical")
    if(props.player)handProps.push("expand-on-hover")

    let _handProps = handProps.join(" ")
    return(
        <>
        <div id='hand' className={_handProps}>
            {props.children}
        </div>
        </>
    )   
}