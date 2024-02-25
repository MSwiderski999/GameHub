import { Card } from "./card"
import { Player } from "./player"

export interface Game{
    gamesTotal: number
    gamesPlayed: number
    players: Array<Player>
    deck: Array<Card>
    current_card?: Card
}