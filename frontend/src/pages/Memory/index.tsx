import { ReactElement, useEffect, useState } from "react"
import GameContainer from "../../components/GameContainer"
import './memory.scss'
import SingleCard from "./SingleCard"
import { Card } from "./card"
import axios from "axios"
import { useAuth } from "../../helpers/checkAuth"
import WinMessage from "./WinMessage"
import TimeLeaderboard from "./Leaderboard/timeLeaderboard"
import TurnsLeaderboard from "./Leaderboard/turnsLeaderboard"

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

    const auth = useAuth()

    const [cards, setCards] = useState<Card[]>([])
    const [turns, setTurns] = useState(0)

    const [pick1, setPick1] = useState<Card | null>(null)
    const [pick2, setPick2] = useState<Card | null>(null)

    const [disabled, setDisabled] = useState(false)
    const [matched, setMatched] = useState(0)

    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [timerRunning, setTimerRunning] = useState(false)

    const [winMessage, setWinMessage] = useState<ReactElement | null>(null)
    const [timeLeaderboard, setTimeLeaderboard] = useState<ReactElement | null>(null)
    const [turnsLeaderboard, setTurnsLeaderboard] = useState<ReactElement | null>(null)

    const pullLeaderboard = () => {
        axios.get('http://localhost:3000/memory/leaderboard/time')
            .then(res => {
                if(res.status === 200){
                    setTimeLeaderboard(<TimeLeaderboard data={res.data.table}/>)
                }
            })
            .catch(err => console.log(err))
        axios.get('http://localhost:3000/memory/leaderboard/turns')
            .then(res => {
                if(res.status === 200){
                    setTurnsLeaderboard(<TurnsLeaderboard data={res.data.table}/>)
                }
            })
            .catch(err => console.log(err))
    }

    const resetTimer = () => {
        setSeconds(0)
        setMinutes(0)
    }

    useEffect(() => {
        if(timerRunning){
            const timer = setTimeout(() => {
                setSeconds(seconds => seconds + 1)
                if(seconds === 59){
                    setMinutes(minutes + 1)
                    setSeconds(0)
                }
            }, 1000)
            return () => {
                clearTimeout(timer)
            }
        }
    },[seconds, timerRunning])

    // shuffle cards
    const shuffleCards = (amount: number) => {

       const picked_cards = cardImages
            .sort(() => Math.random() - 0.5)
            .slice(cardImages.length - amount)

        const shuffledCards: Card[] = [...picked_cards, ...picked_cards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random()}))

        setPick1(null)
        setPick2(null)
        setCards(shuffledCards)
        setTurns(0)
        setMatched(0)
        resetTimer()
        setTimerRunning(false)
        setWinMessage(null)
        pullLeaderboard()
    }

    //handle a pick
    const handlePick = (card: Card) => {
        pick1 ? setPick2(card) : setPick1(card)
        setTimerRunning(true)
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
                setMatched(matched + 2)
                if(matched === 38){
                    setTimerRunning(false)
                    setTimeout(() => {
                        setWinMessage(<div className="tinted">
                            <WinMessage 
                                turns={turns + 1}
                                time={minutes.toString().padStart(2, "0")+":"+seconds.toString().padStart(2, "0")}
                                visible={true}>
                                    <button id="new-game-btn" onClick={() => shuffleCards(20)}>Play again</button>
                            </WinMessage>
                            </div>)
                    }, 500)
                    handleSaveScore()
                }
                resetTurn()
            }else{
                setTimeout(() => resetTurn(), 700)
            }
        }
    }, [pick1, pick2])

    //start the game automatically
    useEffect(() => {
        shuffleCards(20)
        pullLeaderboard()
    }, [])

    axios.defaults.withCredentials = true
    const handleSaveScore = () => {
        if(auth !== undefined){
            const values = {
                seconds: seconds.toString().padStart(2, "0"),
                minutes: minutes.toString().padStart(2, "0"),
                turns: turns,
                user: auth
            }
            axios.post('http://localhost:3000/memory', values)
            .then(res => {
                console.log(res.data)
                if(res.data.status !== "Success"){
                    alert(res.data.Message)
                }
            })
            .catch(err => console.log(err))
        }
    }

    return(
        <>
        <GameContainer>
        <div className="info-panel">
            <div className="timer">
                {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </div>
            <div className="btn">
                <button id="new-game-btn" onClick={() => shuffleCards(20)}>New game</button>
            </div>
            <div className="stats">
                <div className="matched">
                    Matched: {matched.toString().padStart(2, "0")}/40
                </div>
                <div className="turns">
                    Turns: {turns}
                </div>
            </div>
        </div>
        <div id="grid-container">
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
        </div>
        {winMessage}
        {timeLeaderboard}
        {turnsLeaderboard}
        </GameContainer>
        </>
    )
}