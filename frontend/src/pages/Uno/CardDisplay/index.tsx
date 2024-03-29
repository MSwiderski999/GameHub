import './card.scss'

interface CardProps{
    symbol: string,
    suit: string,
    facing?: string,
    backSide?: boolean
}

export default function CardDisplay(props: CardProps){
    let _cardProps = ["card", props.suit]
    let _topCornerSymbolProps = ["symbol", "corner-symbol"]
    let _bottomCornerSymbolProps = ["symbol", "corner-symbol"]
    let _mainSymbolProps : string[] = ["symbol", "main-symbol"]
    let _mainSpanProps : string[] = []

    switch(props.facing){
        case "left":
            _cardProps.push("horizontal")
            _mainSymbolProps.push("horizontal-symbol")
            _mainSpanProps.push("main-span-left")
            break
        case "right":
            _cardProps.push("horizontal")
            _mainSymbolProps.push("horizontal-symbol")
            _mainSpanProps.push("main-span-right")
            break
        case "down":
            _cardProps.push("vertical")
            _mainSymbolProps.push("vertical-symbol")
            _mainSpanProps.push("main-span-down")
            break
        case "up":
            _cardProps.push("vertical")
            _mainSymbolProps.push("vertical-symbol")
            _mainSpanProps.push("main-span-up")
            break
    }

    if(props.backSide){
        _cardProps.push("back-side")
        _mainSymbolProps.push("back-symbol")
    }
    else{
        _mainSymbolProps.push("front-symbol")
        _mainSpanProps = ["main-span-front"]
    }

    let cardProps = _cardProps.join(' ')
    let topCornerSymbolProps = _topCornerSymbolProps.join(' ')
    let bottomCornerSymbolProps = _bottomCornerSymbolProps.join(' ')
    let mainSymbolProps = _mainSymbolProps.join(' ')
    let mainSpanProps = _mainSpanProps.join(' ')

    return (
        props.backSide
        ?
        <div className={cardProps}>
            <div className={mainSymbolProps}><span id={mainSpanProps}>UNO</span></div>
        </div>
        :
        <div className={cardProps}>
            <div className={topCornerSymbolProps} id="top-left"><span className="corner-span">{props.symbol}</span></div>
            <div className={mainSymbolProps}><span id={mainSpanProps}>{props.symbol}</span></div>
            <div className={bottomCornerSymbolProps} id="bottom-right"><span className="corner-span">{props.symbol}</span></div>
        </div>
    )
}