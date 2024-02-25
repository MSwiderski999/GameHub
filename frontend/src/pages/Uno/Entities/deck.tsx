import { Card } from "./card";

const Deck: Array<Card> = [
    {suit: "blue", symbol: "0", value: 0},
    {suit: "blue", symbol: "1", value: 1},
    {suit: "blue", symbol: "2", value: 2},
    {suit: "blue", symbol: "3", value: 3},
    {suit: "blue", symbol: "4", value: 4},
    {suit: "blue", symbol: "5", value: 5},
    {suit: "blue", symbol: "6", value: 6},
    {suit: "blue", symbol: "7", value: 7},
    {suit: "blue", symbol: "8", value: 8},
    {suit: "blue", symbol: "9", value: 9},
    {suit: "blue", symbol: "⊖", value: 20},
    {suit: "blue", symbol: "⥂", value: 20},
    {suit: "blue", symbol: "❏", value: 20},

    {suit: "green", symbol: "0", value: 0},
    {suit: "green", symbol: "1", value: 1},
    {suit: "green", symbol: "2", value: 2},
    {suit: "green", symbol: "3", value: 3},
    {suit: "green", symbol: "4", value: 4},
    {suit: "green", symbol: "5", value: 5},
    {suit: "green", symbol: "6", value: 6},
    {suit: "green", symbol: "7", value: 7},
    {suit: "green", symbol: "8", value: 8},
    {suit: "green", symbol: "9", value: 9},
    {suit: "green", symbol: "⊖", value: 20},
    {suit: "green", symbol: "⥂", value: 20},
    {suit: "green", symbol: "❏", value: 20},

    {suit: "red", symbol: "0", value: 0},
    {suit: "red", symbol: "1", value: 1},
    {suit: "red", symbol: "2", value: 2},
    {suit: "red", symbol: "3", value: 3},
    {suit: "red", symbol: "4", value: 4},
    {suit: "red", symbol: "5", value: 5},
    {suit: "red", symbol: "6", value: 6},
    {suit: "red", symbol: "7", value: 7},
    {suit: "red", symbol: "8", value: 8},
    {suit: "red", symbol: "9", value: 9},
    {suit: "red", symbol: "⊖", value: 20},
    {suit: "red", symbol: "⥂", value: 20},
    {suit: "red", symbol: "❏", value: 20},

    {suit: "yellow", symbol: "0", value: 0},
    {suit: "yellow", symbol: "1", value: 1},
    {suit: "yellow", symbol: "2", value: 2},
    {suit: "yellow", symbol: "3", value: 3},
    {suit: "yellow", symbol: "4", value: 4},
    {suit: "yellow", symbol: "5", value: 5},
    {suit: "yellow", symbol: "6", value: 6},
    {suit: "yellow", symbol: "7", value: 7},
    {suit: "yellow", symbol: "8", value: 8},
    {suit: "yellow", symbol: "9", value: 9},
    {suit: "yellow", symbol: "⊖", value: 20},
    {suit: "yellow", symbol: "⥂", value: 20},
    {suit: "yellow", symbol: "❏", value: 20},

    {suit: "blue", symbol: "1", value: 1},
    {suit: "blue", symbol: "2", value: 2},
    {suit: "blue", symbol: "3", value: 3},
    {suit: "blue", symbol: "4", value: 4},
    {suit: "blue", symbol: "5", value: 5},
    {suit: "blue", symbol: "6", value: 6},
    {suit: "blue", symbol: "7", value: 7},
    {suit: "blue", symbol: "8", value: 8},
    {suit: "blue", symbol: "9", value: 9},
    {suit: "blue", symbol: "⊖", value: 20},
    {suit: "blue", symbol: "⥂", value: 20},
    {suit: "blue", symbol: "❏", value: 20},

    {suit: "green", symbol: "1", value: 1},
    {suit: "green", symbol: "2", value: 2},
    {suit: "green", symbol: "3", value: 3},
    {suit: "green", symbol: "4", value: 4},
    {suit: "green", symbol: "5", value: 5},
    {suit: "green", symbol: "6", value: 6},
    {suit: "green", symbol: "7", value: 7},
    {suit: "green", symbol: "8", value: 8},
    {suit: "green", symbol: "9", value: 9},
    {suit: "green", symbol: "⊖", value: 20},
    {suit: "green", symbol: "⥂", value: 20},
    {suit: "green", symbol: "❏", value: 20},

    {suit: "red", symbol: "1", value: 1},
    {suit: "red", symbol: "2", value: 2},
    {suit: "red", symbol: "3", value: 3},
    {suit: "red", symbol: "4", value: 4},
    {suit: "red", symbol: "5", value: 5},
    {suit: "red", symbol: "6", value: 6},
    {suit: "red", symbol: "7", value: 7},
    {suit: "red", symbol: "8", value: 8},
    {suit: "red", symbol: "9", value: 9},
    {suit: "red", symbol: "⊖", value: 20},
    {suit: "red", symbol: "⥂", value: 20},
    {suit: "red", symbol: "❏", value: 20},

    {suit: "yellow", symbol: "1", value: 1},
    {suit: "yellow", symbol: "2", value: 2},
    {suit: "yellow", symbol: "3", value: 3},
    {suit: "yellow", symbol: "4", value: 4},
    {suit: "yellow", symbol: "5", value: 5},
    {suit: "yellow", symbol: "6", value: 6},
    {suit: "yellow", symbol: "7", value: 7},
    {suit: "yellow", symbol: "8", value: 8},
    {suit: "yellow", symbol: "9", value: 9},
    {suit: "yellow", symbol: "⊖", value: 20},
    {suit: "yellow", symbol: "⥂", value: 20},
    {suit: "yellow", symbol: "❏", value: 20},

    {suit: "changeColor", symbol: "🗇", value: 50},
    {suit: "changeColor", symbol: "🗇", value: 50},
    {suit: "changeColor", symbol: "🗇", value: 50},
    {suit: "changeColor", symbol: "🗇", value: 50},
    {suit: "changeColor", symbol: "⊕", value: 50},
    {suit: "changeColor", symbol: "⊕", value: 50},
    {suit: "changeColor", symbol: "⊕", value: 50},
    {suit: "changeColor", symbol: "⊕", value: 50}
]

const shuffle = (deck: Card[]) => { 
    return deck.sort(() => Math.random() - 0.5); 
}

const take = (deck: Card[]) => {
   let card = deck.pop()
   return card as Card
}

export { Deck, take, shuffle }