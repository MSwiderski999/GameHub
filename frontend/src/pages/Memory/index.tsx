import { useEffect, useState } from "react"
import GameContainer from "../../components/GameContainer"
import './memory.scss'
import SingleCard from "./SingleCard"
import Infobox from "../../components/InfoBox"
import { Card } from "./card"

const cardImages = [
    { "src": "/Images/animals/ant.png", "matched": false },
    { "src": "/Images/animals/badger.png", "matched": false },
    { "src": "/Images/animals/bat.png", "matched": false },
    { "src": "/Images/animals/beaver.png", "matched": false },
    { "src": "/Images/animals/beetle.png", "matched": false },
    { "src": "/Images/animals/blowfish.png", "matched": false },
    { "src": "/Images/animals/bug.png", "matched": false },
    { "src": "/Images/animals/butterfly.png", "matched": false },
    { "src": "/Images/animals/cat.png", "matched": false },
    { "src": "/Images/animals/chipmunk.png", "matched": false },
    { "src": "/Images/animals/cockroach.png", "matched": false },
    { "src": "/Images/animals/crab.png", "matched": false },
    { "src": "/Images/animals/cricket.png", "matched": false },
    { "src": "/Images/animals/deer.png", "matched": false },
    { "src": "/Images/animals/dog.png", "matched": false },
    { "src": "/Images/animals/dolphin.png", "matched": false },
    { "src": "/Images/animals/dove.png", "matched": false },
    { "src": "/Images/animals/duck.png", "matched": false },
    { "src": "/Images/animals/ewe.png", "matched": false },
    { "src": "/Images/animals/fish.png", "matched": false },
    { "src": "/Images/animals/flamingo.png", "matched": false },
    { "src": "/Images/animals/fly.png", "matched": false },
    { "src": "/Images/animals/goat.png", "matched": false },
    { "src": "/Images/animals/hedgehog.png", "matched": false },
    { "src": "/Images/animals/honeybee.png", "matched": false },
    { "src": "/Images/animals/horse.png", "matched": false},
    { "src": "/Images/animals/jellyfish.png", "matched": false },
    { "src": "/Images/animals/kangaroo.png", "matched": false },
    { "src": "/Images/animals/lady-beetle.png", "matched": false },
    { "src": "/Images/animals/lizard.png", "matched": false },
    { "src": "/Images/animals/lobster.png", "matched": false },
    { "src": "/Images/animals/monkey.png", "matched": false },
    { "src": "/Images/animals/mosquito.png", "matched": false },
    { "src": "/Images/animals/mouse.png", "matched": false },
    { "src": "/Images/animals/octopus.png", "matched": false },
    { "src": "/Images/animals/otter.png", "matched": false },
    { "src": "/Images/animals/owl.png", "matched": false },
    { "src": "/Images/animals/parrot.png", "matched": false },
    { "src": "/Images/animals/peacock.png", "matched": false },
    { "src": "/Images/animals/penguin.png", "matched": false },
    { "src": "/Images/animals/rabbit.png", "matched": false },
    { "src": "/Images/animals/rat.png", "matched": false },
    { "src": "/Images/animals/rooster.png", "matched": false },
    { "src": "/Images/animals/scorpion.png", "matched": false },
    { "src": "/Images/animals/shrimp.png", "matched": false },
    { "src": "/Images/animals/skunk.png", "matched": false },
    { "src": "/Images/animals/sloth.png", "matched": false },
    { "src": "/Images/animals/snail.png", "matched": false},
    { "src": "/Images/animals/snake.png", "matched": false},
    { "src": "/Images/animals/spider.png", "matched": false },
    { "src": "/Images/animals/squid.png", "matched": false },
    { "src": "/Images/animals/turtle.png", "matched": false },
    { "src": "/Images/animals/worm.png", "matched": false }
]

export default function Memory(){

    const [cards, setCards] = useState<Card[]>([])
    const [turns, setTurns] = useState(0)

    const [pick1, setPick1] = useState<Card | null>(null)
    const [pick2, setPick2] = useState<Card | null>(null)

    const [disabled, setDisabled] = useState(false)

    // shuffle cards
    const shuffleCard = (amount: number) => {

        const picked_cards = cardImages
            .sort(() => Math.random() - 0.5)
            .slice(cardImages.length - amount)

        const shuffledCards: Card[] = [...picked_cards, ...picked_cards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random()}))

        setCards(shuffledCards)
        setTurns(0)
    }

    //handle a pick
    const handlePick = (card: Card) => {
        pick1 ? setPick2(card) : setPick1(card)
    }

    //reset picks and increase turn count
    const resetTurn = () => {
        setPick1(null)
        setPick2(null)
        setTurns(turns + 1)
        setDisabled(false)
    }

    //compare picks
    useEffect(() => {
        if(pick1 && pick2){
            setDisabled(true)

            if(pick1.src === pick2.src){
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src === pick1.src){
                            return {...card, matched: true}
                        }else{
                            return card
                        }
                    })
                })
                resetTurn()
            }else{
                setTimeout(() => resetTurn(), 700)
            }
        }
    }, [pick1, pick2])

    return(
        <>
        <GameContainer>
        <button onClick={() => shuffleCard(20)}>New game</button>
        <Infobox><>Turns: {turns}</></Infobox>
        <div className="card-grid">
            {cards.map(card => (
                <SingleCard
                    key={card.id}
                    card={card}
                    handlePick={handlePick}
                    flipped={card === pick1 || card === pick2 || card.matched}
                    disabled={disabled}
                />
            ))}
        </div>
        </GameContainer>
        </>
    )
}