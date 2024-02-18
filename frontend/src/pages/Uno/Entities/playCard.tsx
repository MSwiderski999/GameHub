import { Card } from "./card";
import { Player } from "./player";

const play_random = (player: Player, curr_card: Card) =>{

    let playable_hand : Array<Card> = []
    player.hand.forEach(card => {
        if(card.suit === "changeColor" || card.suit === curr_card.suit || card.symbol === curr_card.symbol) playable_hand.push(card)
    })

    if(playable_hand.length === 0) return null

    const rand_index : number = Math.floor(Math.random() * playable_hand.length)
    let selected_card : Card = playable_hand[rand_index]

    const index = player.hand.indexOf(selected_card)

    if(selected_card.suit === "changeColor"){
        const rand_suit = Math.floor(Math.random() * 4)
        switch(rand_suit){
            case 0:
                selected_card.suit = "blue"
                break
            case 1:
                selected_card.suit = "green"
                break
            case 2:
                selected_card.suit = "red"
                break
            case 3:
                selected_card.suit = "yellow"
                break
        }
    }

    player.hand.splice(index, 1)
    return selected_card
}