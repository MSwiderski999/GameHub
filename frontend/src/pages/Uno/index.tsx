import { ReactElement, useState } from "react";
import GameForm from "../../components/GameForm";
import CardDisplay from "./CardDisplay";
import { Game } from "./Entities/game";
import { Deck, shuffle, take } from "./Entities/deck";
import GameContainer from "../../components/GameContainer";
import '../../../public/Images/guest.png'
import '../../../public/Images/bot.png'
import PlayerTag from "../../components/PlayerTag";
import Hand from "./HandDisplay";
import { Card } from "./Entities/card";
import './uno.scss'

export default function Uno(){
    const [active, setActive] = useState(false)

    const [gamesTotal, setGamesTotal] = useState(1)
    const [difficulty, setDifficulty] = useState("easy")
    const [numberOfBots, setNumberOfBots] = useState(3)

    const [current_card, setCurrentCard] = useState({
        symbol: "",
        suit: "",
        backside: true
    })

    const [playerHand, setPlayerHand] = useState(new Array<ReactElement>)
    const [bot1Hand, setBot1Hand] = useState(new Array<ReactElement>)
    const [bot2Hand, setBot2Hand] = useState(new Array<ReactElement>)
    const [bot3Hand, setBot3Hand] = useState(new Array<ReactElement>)

    const StartGame = async () =>{
        setActive(true)
        const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms)) //delay for smooth animation

        //create game
        const game: Game = {
            gamesTotal: 0,
            gamesPlayed: 0,
            players: [{name: "Guest", hand: [], ai: false}, {name: "Bot 1", hand: [], ai: true}],
            deck: shuffle(Deck)
        }
        if(numberOfBots > 1)game.players.push({name: "Bot 2", hand: [], ai: true})
        if(numberOfBots == 3)game.players.push({name: "Bot 3", hand: [], ai: true})

        let numOfPlayers = game.players.length
        //creat game ; END

        //distributing cards
        for(let i = 0; i < 7 * numOfPlayers; i++){
            const taken : Card = take(game.deck)
            await delay(50)
            game.players[i % numOfPlayers].hand.push(taken)
            switch(i % numOfPlayers){
                case 0:
                    setPlayerHand(playerHand => [...playerHand, <div className="card-container">
                        <CardDisplay suit={taken.suit} symbol={taken.symbol} facing="down"/></div>])
                    break
                case 1:
                    setBot1Hand(bot1Hand => [...bot1Hand, <div className="card-container">
                        <CardDisplay suit={taken.suit} symbol={taken.symbol} backSide facing="up"/></div>])
                    break
                case 2:
                    setBot2Hand(bot2Hand => [...bot2Hand, <div className="card-container">
                        <CardDisplay suit={taken.suit} symbol={taken.symbol} backSide facing="left"/></div>])
                    break
                case 3:
                    setBot3Hand(bot3Hand => [...bot3Hand, <div className="card-container">
                        <CardDisplay suit={taken.suit} symbol={taken.symbol} backSide facing="right"/></div>])
                    break
            }
        }
        game.current_card = take(game.deck)
        setCurrentCard({suit: game.current_card.suit, symbol: game.current_card.symbol, backside: false})
        if(game.current_card.suit == "changeColor"){
            await delay(500)
            var r = Math.floor(Math.random() * 4)
            switch(r){
                case 0:
                    setCurrentCard({suit: "blue", symbol: game.current_card.symbol, backside: false})
                    break
                case 1:
                    setCurrentCard({suit: "green", symbol: game.current_card.symbol, backside: false})
                    break
                case 2:
                    setCurrentCard({suit: "red", symbol: game.current_card.symbol, backside: false})
                    break
                case 3:
                    setCurrentCard({suit: "yellow", symbol: game.current_card.symbol, backside: false})
                    break
            }
        }
        //distributing cards ; END
    }
    return (
        active
        ?
        <GameContainer>
            <div id="bottom">
            <div id="bottom-tag">
                <PlayerTag photoSrc="../../../public/Images/guest.png" playerName="Guest"/>
            </div>
            <div id="bottom-hand">
                <Hand player>
                    {playerHand}
                </Hand>
            </div>
            </div>

            <div id="top">
            <div id="top-tag">
                <PlayerTag photoSrc="../../../public/Images/bot.png" playerName="Bot"/>
            </div>
            <div id="top-hand">
                <Hand>
                    {bot1Hand}
                </Hand>
            </div>
            </div>

            {numberOfBots >= 2 && <div id="left">
            <div id="left-tag"><PlayerTag photoSrc="../../../public/Images/bot.png" playerName="Bot"/></div>
            <div id="left-hand"><Hand rotated>{bot2Hand}</Hand></div></div>}

            {numberOfBots == 3 && <div id="right">
            <div id="right-tag"><PlayerTag photoSrc="../../../public/Images/bot.png" playerName="Bot"/></div>
            <div id="right-hand"><Hand rotated>{bot3Hand}</Hand></div></div>}

            <div id="center-cards">
                <CardDisplay symbol={current_card.symbol} suit={current_card.suit} backSide={current_card.backside} facing="down"/>
                <CardDisplay symbol={""} suit={""} backSide facing="down"/>
            </div>
        </GameContainer>
        :
        <GameForm onSubmit={async () => StartGame()}>
            <>
            <p className="input-label">Number of bots</p>
            <div className="multiple-choice-container">
                <div className={numberOfBots === 1? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setNumberOfBots(1)}>1</div>
                <div className={numberOfBots === 2? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setNumberOfBots(2)}>2</div>
                <div className={numberOfBots === 3? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setNumberOfBots(3)}>3</div>
            </div>

            <p className="input-label">Difficulty</p>
            <div className="multiple-choice-container">
                <div className={difficulty === "easy"? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setDifficulty("easy")}>Easy</div>
                <div className={difficulty === "medium"? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setDifficulty("medium")}>Medium</div>
                <div className={difficulty === "hard"? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setDifficulty("hard")}>Hard</div>
            </div>

            <p className="input-label">Mode</p>
            <div className="multiple-choice-container">
                <div className={gamesTotal === 1? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setGamesTotal(1)}>Single Game</div>
                <div className={gamesTotal === 5? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setGamesTotal(5)}>Best Of 5</div>
                <div className={gamesTotal === 10? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setGamesTotal(10)}>Best Of 10</div>
            </div>
            </>
        </GameForm>
    )
}