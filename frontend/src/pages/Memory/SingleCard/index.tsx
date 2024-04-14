import './singleCard.scss'
import './backgrounds.scss'
import { Card } from '../card'

interface SingleCardProps{
    card: Card
    handlePick: (card: Card) => void
    flipped: boolean
    disabled: boolean}

export default function SingleCard(props: SingleCardProps){

    const handleClick = () => {
        if(!props.disabled){
            props.handlePick(props.card)
        }
    }

    return(
        <div className="card-container">
            <div className={props.flipped ? "flipped" : ""}>
                <div className={"front " + props.card.src.slice(16, -4)}><img className="front-img" src={props.card.src} alt="card"/></div>
                <div className="back" onClick={handleClick}/>
            </div>
        </div>
    )
}