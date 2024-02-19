import { Card } from "./card";

export interface Player{
    name: string
    hand: Array<Card>

    wins?: number
    points?: number
}