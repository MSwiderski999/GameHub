import { Card } from "../Entities/card";

const isPlayable = (card: Card, curr_card: Card) => {
    if(card.value == 50 || card.suit === curr_card.suit || card.symbol === curr_card.symbol) return true
    else return false
}


export {isPlayable}