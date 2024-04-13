import { useState } from "react"
import GameContainer from "../../components/GameContainer"
import './memory.scss'
import SingleCard from "./SingleCard"

const cardImages = [
    { "src": "/Images/animals/ant.png" },
    { "src": "/Images/animals/badger.png" },
    { "src": "/Images/animals/bat.png" },
    { "src": "/Images/animals/beaver.png" },
    { "src": "/Images/animals/beetle.png" },
    { "src": "/Images/animals/blowfish.png" },
    { "src": "/Images/animals/bug.png" },
    { "src": "/Images/animals/butterfly.png" },
    { "src": "/Images/animals/cat.png" },
    { "src": "/Images/animals/chipmunk.png" },
    { "src": "/Images/animals/cockroach.png" },
    { "src": "/Images/animals/crab.png" },
    { "src": "/Images/animals/cricket.png" },
    { "src": "/Images/animals/deer.png" },
    { "src": "/Images/animals/dog.png" },
    { "src": "/Images/animals/dolphin.png" },
    { "src": "/Images/animals/dove.png" },
    { "src": "/Images/animals/duck.png" },
    { "src": "/Images/animals/ewe.png" },
    { "src": "/Images/animals/fish.png" },
    { "src": "/Images/animals/flamingo.png" },
    { "src": "/Images/animals/fly.png" },
    { "src": "/Images/animals/goat.png" },
    { "src": "/Images/animals/hedgehog.png" },
    { "src": "/Images/animals/honeybee.png" },
    { "src": "/Images/animals/horse.png" },
    { "src": "/Images/animals/jellyfish.png" },
    { "src": "/Images/animals/kangaroo.png" },
    { "src": "/Images/animals/lady-beetle.png" },
    { "src": "/Images/animals/lizard.png" },
    { "src": "/Images/animals/lobster.png" },
    { "src": "/Images/animals/monkey.png" },
    { "src": "/Images/animals/mosquito.png" },
    { "src": "/Images/animals/mouse.png" },
    { "src": "/Images/animals/octopus.png" },
    { "src": "/Images/animals/otter.png" },
    { "src": "/Images/animals/owl.png" },
    { "src": "/Images/animals/parrot.png" },
    { "src": "/Images/animals/peacock.png" },
    { "src": "/Images/animals/penguin.png" },
    { "src": "/Images/animals/rabbit.png" },
    { "src": "/Images/animals/rat.png" },
    { "src": "/Images/animals/rooster.png" },
    { "src": "/Images/animals/scorpion.png" },
    { "src": "/Images/animals/shrimp.png" },
    { "src": "/Images/animals/skunk.png" },
    { "src": "/Images/animals/sloth.png" },
    { "src": "/Images/animals/snail.png" },
    { "src": "/Images/animals/snake.png" },
    { "src": "/Images/animals/spider.png" },
    { "src": "/Images/animals/squid.png" },
    { "src": "/Images/animals/turtle.png" },
    { "src": "/Images/animals/worm.png" }
]

export default function Memory(){

    const [cards, setCards] = useState<{id: number, src: string}[]>([])
    const [turns, setTurns] = useState(0)

    const shuffleCard = (amount: number) => {

        const picked_cards = cardImages
            .sort(() => Math.random() - 0.5)
            .slice(cardImages.length - amount)

        const shuffledCards = [...picked_cards, ...picked_cards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random()}))

        setCards(shuffledCards)
        setTurns(0)
    }

    return(
        <>
        <GameContainer>
        <button onClick={() => shuffleCard(20)}>Click</button>
        <div className="card-grid">
            {cards.map(card => (
                <SingleCard id={card.id} src={card.src}/>
            ))}
        </div>
        </GameContainer>
        </>
    )
}