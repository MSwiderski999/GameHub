import './card.scss'

interface CardProps{
    symbol: string,
    suit: string,
    effect?: () => {}
    backSide?: boolean
}

export default function CardDisplay(props: CardProps){
    return (
        props.backSide
        ?
        <div className={"card back-side"}>
            <div className="back-symbol"><span id="back-span">UNO</span></div>
        </div>
        :
        <div className={"card" + " " + props.suit}>
            <div className="corner-symbol" id="top-left">{props.symbol}</div>
            <div className="main-symbol"><span id="main-span">{props.symbol}</span></div>
            <div className="corner-symbol" id="bottom-right"><span id="corner-span">{props.symbol}</span></div>
        </div>
    )
}