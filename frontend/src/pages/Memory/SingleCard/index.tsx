import './singleCard.scss'
import { Card } from '../card'

interface SingleCardProps{
    card: Card
    handlePick: (card: Card) => void
}

export default function SingleCard(props: SingleCardProps){

    const handleClick = () => {
        props.handlePick(props.card)
    }

    return(
        <div className="card-container">
            <div>
                    <div className="front"><img className="front-img" src={props.card.src} alt="card"/></div>
                    <div className="back" onClick={handleClick}/>
            </div>
        </div>
    )
}