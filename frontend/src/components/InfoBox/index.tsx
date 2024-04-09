import { ReactElement } from 'react'
import './infobox.scss'

interface InfoBoxProps{
    children?: ReactElement
}
export default function Infobox(props: InfoBoxProps){
    return(
        <div className='info-box'>{props.children}</div>
    )
}