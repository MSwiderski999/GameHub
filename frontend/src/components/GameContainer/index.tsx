import { ReactNode } from 'react'
import './gameContainer.scss'

interface GameContainerProps{
    children?: ReactNode
}

export default function GameContainer(props: GameContainerProps){
    return(
        <>
        <div className='game-container'>
            {props.children}
        </div>
        </>
    )
}