export interface Card{
    symbol: string
    suit: string
    value: number

    effect?: () => {}
}
