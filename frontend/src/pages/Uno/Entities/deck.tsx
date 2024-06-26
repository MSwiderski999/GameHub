import { Card } from "./card";

const Deck = [
    {id: 0, suit: "blue", symbol: "0", value: 0},
    {id: 1, suit: "blue", symbol: "1", value: 1},
    {id: 2, suit: "blue", symbol: "2", value: 2},
    {id: 3, suit: "blue", symbol: "3", value: 3},
    {id: 4, suit: "blue", symbol: "4", value: 4},
    {id: 5, suit: "blue", symbol: "5", value: 5},
    {id: 6, suit: "blue", symbol: "6", value: 6},
    {id: 7, suit: "blue", symbol: "7", value: 7},
    {id: 8, suit: "blue", symbol: "8", value: 8},
    {id: 9, suit: "blue", symbol: "9", value: 9},
    {id: 10, suit: "blue", symbol: "⊖", value: 20},
    {id: 11, suit: "blue", symbol: "⥂", value: 20},
    {id: 12, suit: "blue", symbol: "❏", value: 20},
    {id: 13, suit: "green", symbol: "0", value: 0},
    {id: 14, suit: "green", symbol: "1", value: 1},
    {id: 15, suit: "green", symbol: "2", value: 2},
    {id: 16, suit: "green", symbol: "3", value: 3},
    {id: 17, suit: "green", symbol: "4", value: 4},
    {id: 18, suit: "green", symbol: "5", value: 5},
    {id: 19, suit: "green", symbol: "6", value: 6},
    {id: 20, suit: "green", symbol: "7", value: 7},
    {id: 21, suit: "green", symbol: "8", value: 8},
    {id: 22, suit: "green", symbol: "9", value: 9},
    {id: 23, suit: "green", symbol: "⊖", value: 20},
    {id: 24, suit: "green", symbol: "⥂", value: 20},
    {id: 25, suit: "green", symbol: "❏", value: 20},
    {id: 26, suit: "red", symbol: "0", value: 0},
    {id: 27, suit: "red", symbol: "1", value: 1},
    {id: 28, suit: "red", symbol: "2", value: 2},
    {id: 29, suit: "red", symbol: "3", value: 3},
    {id: 30, suit: "red", symbol: "4", value: 4},
    {id: 31, suit: "red", symbol: "5", value: 5},
    {id: 32, suit: "red", symbol: "6", value: 6},
    {id: 33, suit: "red", symbol: "7", value: 7},
    {id: 34, suit: "red", symbol: "8", value: 8},
    {id: 35, suit: "red", symbol: "9", value: 9},
    {id: 36, suit: "red", symbol: "⊖", value: 20},
    {id: 37, suit: "red", symbol: "⥂", value: 20},
    {id: 38, suit: "red", symbol: "❏", value: 20},
    {id: 39, suit: "yellow", symbol: "0", value: 0},
    {id: 40, suit: "yellow", symbol: "1", value: 1},
    {id: 41, suit: "yellow", symbol: "2", value: 2},
    {id: 42, suit: "yellow", symbol: "3", value: 3},
    {id: 43, suit: "yellow", symbol: "4", value: 4},
    {id: 44, suit: "yellow", symbol: "5", value: 5},
    {id: 45, suit: "yellow", symbol: "6", value: 6},
    {id: 46, suit: "yellow", symbol: "7", value: 7},
    {id: 47, suit: "yellow", symbol: "8", value: 8},
    {id: 48, suit: "yellow", symbol: "9", value: 9},
    {id: 49, suit: "yellow", symbol: "⊖", value: 20},
    {id: 50, suit: "yellow", symbol: "⥂", value: 20},
    {id: 51, suit: "yellow", symbol: "❏", value: 20},
    {id: 52, suit: "blue", symbol: "1", value: 1},
    {id: 53, suit: "blue", symbol: "2", value: 2},
    {id: 54, suit: "blue", symbol: "3", value: 3},
    {id: 55, suit: "blue", symbol: "4", value: 4},
    {id: 56, suit: "blue", symbol: "5", value: 5},
    {id: 57, suit: "blue", symbol: "6", value: 6},
    {id: 58, suit: "blue", symbol: "7", value: 7},
    {id: 59, suit: "blue", symbol: "8", value: 8},
    {id: 60, suit: "blue", symbol: "9", value: 9},
    {id: 61, suit: "blue", symbol: "⊖", value: 20},
    {id: 62, suit: "blue", symbol: "⥂", value: 20},
    {id: 63, suit: "blue", symbol: "❏", value: 20},
    {id: 64, suit: "green", symbol: "1", value: 1},
    {id: 65, suit: "green", symbol: "2", value: 2},
    {id: 66, suit: "green", symbol: "3", value: 3},
    {id: 67, suit: "green", symbol: "4", value: 4},
    {id: 68, suit: "green", symbol: "5", value: 5},
    {id: 69, suit: "green", symbol: "6", value: 6},
    {id: 70, suit: "green", symbol: "7", value: 7},
    {id: 71, suit: "green", symbol: "8", value: 8},
    {id: 72, suit: "green", symbol: "9", value: 9},
    {id: 73, suit: "green", symbol: "⊖", value: 20},
    {id: 74, suit: "green", symbol: "⥂", value: 20},
    {id: 75, suit: "green", symbol: "❏", value: 20},
    {id: 76, suit: "red", symbol: "1", value: 1},
    {id: 77, suit: "red", symbol: "2", value: 2},
    {id: 78, suit: "red", symbol: "3", value: 3},
    {id: 79, suit: "red", symbol: "4", value: 4},
    {id: 80, suit: "red", symbol: "5", value: 5},
    {id: 81, suit: "red", symbol: "6", value: 6},
    {id: 82, suit: "red", symbol: "7", value: 7},
    {id: 83, suit: "red", symbol: "8", value: 8},
    {id: 84, suit: "red", symbol: "9", value: 9},
    {id: 85, suit: "red", symbol: "⊖", value: 20},
    {id: 86, suit: "red", symbol: "⥂", value: 20},
    {id: 87, suit: "red", symbol: "❏", value: 20},
    {id: 88, suit: "yellow", symbol: "1", value: 1},
    {id: 89, suit: "yellow", symbol: "2", value: 2},
    {id: 90, suit: "yellow", symbol: "3", value: 3},
    {id: 91, suit: "yellow", symbol: "4", value: 4},
    {id: 92, suit: "yellow", symbol: "5", value: 5},
    {id: 93, suit: "yellow", symbol: "6", value: 6},
    {id: 94, suit: "yellow", symbol: "7", value: 7},
    {id: 95, suit: "yellow", symbol: "8", value: 8},
    {id: 96, suit: "yellow", symbol: "9", value: 9},
    {id: 97, suit: "yellow", symbol: "⊖", value: 20},
    {id: 98, suit: "yellow", symbol: "⥂", value: 20},
    {id: 99, suit: "yellow", symbol: "❏", value: 20},
    {id: 100, suit: "changeColor", symbol: "🗇", value: 50},
    {id: 101, suit: "changeColor", symbol: "🗇", value: 50},
    {id: 102, suit: "changeColor", symbol: "🗇", value: 50},
    {id: 103, suit: "changeColor", symbol: "🗇", value: 50},
    {id: 104, suit: "changeColor", symbol: "⊕", value: 50},
    {id: 105, suit: "changeColor", symbol: "⊕", value: 50},
    {id: 106, suit: "changeColor", symbol: "⊕", value: 50},
    {id: 107, suit: "changeColor", symbol: "⊕", value: 50}
]

const shuffle = (deck: Card[]) => {
    return deck.sort(() => Math.random() - 0.5); 
}

const take = (deck: Card[]) => {
   let card = deck.pop()
   return card as Card
}

const sort_hand = (hand: Card[]) => {
    hand.sort((a, b) => {
        let suit_a = a.suit == "changeColor" ? "a" : a.suit
        let suit_b = b.suit == "changeColor" ? "a" : b.suit
        return suit_a.localeCompare(suit_b) || a.value - b.value
    })
}

export { Deck, take, shuffle, sort_hand }