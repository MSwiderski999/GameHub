import './card.scss'

interface CardProps{
    symbol: string,
    suit: string,
    value: number,
    effect?: () => {}
}

export default function Card(props: CardProps){
    return (
        <div className={"card" + " " + props.suit}>
            <div className="corner-symbol" id="top-left"><span>{props.symbol}</span></div>
            <div className="main-symbol"><span id="main-span">{props.symbol}</span></div>
            <div className="corner-symbol" id="bottom-right"><span>{props.symbol}</span></div>
        </div>
    )
}