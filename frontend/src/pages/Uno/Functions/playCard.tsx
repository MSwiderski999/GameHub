import { Card } from "../Entities/card"
import { isPlayable } from "./isPlayable"
import { from } from "linq-to-typescript"


const pick_suit = (hand: Card[]) => {
    let blue = 0
    let red = 0
    let green = 0
    let yellow = 0
    hand.forEach(card => {
        switch(card.suit){
            case "blue":
                blue++
                break
            case "green":
                green++
                break
            case "red":
                red++
                break
            case "yellow":
                yellow++
                break
        }
    })
    let highest = "blue"
    if(blue < green)highest = "green"
    if(green < red)highest = "red"
    if(red < yellow)highest = "yellow"

    return highest
}

const play_random = (hand: Card[], curr_card: Card) =>{

    let playable_hand : Array<Card> = []
    hand.forEach(card => {
        if(isPlayable(card, curr_card)) playable_hand.push(card)
    })

    if(playable_hand.length === 0) return null

    const rand_index : number = Math.floor(Math.random() * playable_hand.length)
    let selected_card : Card = playable_hand[rand_index]

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
    return selected_card.id
}



const play_optimal = (hand: Card[], curr_card: Card) =>{
    const playable_hand = hand.filter((card) => isPlayable(card, curr_card))
    if(playable_hand.length == 0)return null //return null if no available cards

    let only_color_change = true
    playable_hand.forEach(card => {
        if(card.suit != "changeColor") only_color_change = false
    })
    if(only_color_change === true){
        let selected_card : Card = playable_hand[0]
        return selected_card.id
    }

    let preferred_suit = pick_suit(playable_hand)
    let final_cards = from(playable_hand).where((x) => x.suit === preferred_suit).orderByDescending((x) => x.value).toArray()
    let selected_card = final_cards[0]
    return selected_card.id
}

const play_mixed = (hand: Card[], curr_card: Card) => {
    if(Math.round(Math.random())){
        return play_optimal(hand, curr_card)
    }
    else{
        return play_random(hand, curr_card)
    }
}

export {play_random, play_optimal, play_mixed, pick_suit}