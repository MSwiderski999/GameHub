import { Card } from "../Entities/card"
import { Player } from "../Entities/player"
import { isPlayable } from "./isPlayable"
import { from } from "linq-to-typescript"


const pick_suit = (hand: Card[]) => {
    let c : any = {
        "blue": [],
        "red": [],
        "green": [],
        "yellow": []
    }
    hand.forEach(card => {
        c[card.suit] = c[card.suit] || []
        c[card.suit].push(card)
    })
    let highest_suit = "blue"
    if(c["red"].length > c["blue"].length) highest_suit = "red"
    if(c["green"].length > c["red"].length) highest_suit = "green"
    if(c["yellow"].length > c["green"].length) highest_suit = "yellow"

    return highest_suit
}

const play_random = (player: Player, curr_card: Card) =>{

    let playable_hand : Array<Card> = []
    player.hand.forEach(card => {
        if(isPlayable(card, curr_card)) playable_hand.push(card)
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



const play_optimal = (player: Player, curr_card: Card) =>{
    const playable_hand = from(player.hand).where((x) => isPlayable(x, curr_card)).toArray()
    if(playable_hand.length == 0)return null //return null if no available cards

    let only_color_change = true
    playable_hand.forEach(card => {
        if(card.suit != "changeColor") only_color_change = false
    })
    if(only_color_change === true){
        let selected_card : Card = playable_hand[0]
        const index = player.hand.indexOf(selected_card)
        let preferred_suit = pick_suit(player.hand)
        selected_card.suit = preferred_suit
        player.hand.splice(index, 1)
        return selected_card
    }

    let preferred_suit = pick_suit(playable_hand)
    let final_cards = from(playable_hand).where((x) => x.suit === preferred_suit).orderByDescending((x) => x.value).toArray()
    let selected_card = final_cards[0]
    let index = player.hand.indexOf(selected_card)
    player.hand.splice(index, 1)
    return selected_card
}

export {play_random, play_optimal}