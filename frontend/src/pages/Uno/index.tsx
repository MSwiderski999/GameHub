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

    const StartGame = () =>{
        setActive(true)

        const game: Game = {
            gamesTotal: 0,
            gamesPlayed: 0,
            players: [{name: "Guest", hand: [], ai: false}, {name: "Bot 1", hand: [], ai: true}],
            deck: shuffle(Deck)
        }
        if(numberOfBots >= 1)game.players.push({name: "Bot 2", hand: [], ai: true})
        if(numberOfBots == 3)game.players.push({name: "Bot 3", hand: [], ai: true})

        let numOfPlayers = game.players.length

        for(let i = 0; i < 3 * numOfPlayers; i++){
            const taken : Card = take(game.deck)
            game.players[i % numOfPlayers].hand.push(taken)
            switch(i % numOfPlayers){
                case 0:
                    setPlayerHand(playerHand => [...playerHand, <CardDisplay suit={taken.suit} symbol={taken.symbol}/>])
                    break
                case 1:
                    setBot1Hand(bot1Hand => [...bot1Hand, <CardDisplay suit={taken.suit} symbol={taken.symbol}/>])
                    break
                case 2:
                    setBot2Hand(bot2Hand => [...bot2Hand, <CardDisplay suit={taken.suit} symbol={taken.symbol}/>])
                    break
                case 3:
                    setBot3Hand(bot3Hand => [...bot3Hand, <CardDisplay suit={taken.suit} symbol={taken.symbol}/>])
                    break
            }
        }
        game.current_card = take(game.deck)
        setCurrentCard({suit: game.current_card.suit, symbol: game.current_card.symbol, backside: false})
    }
    return (
        active
        ?
        <GameContainer>
            <PlayerTag photoSrc="../../../public/Images/guest.png" playerName="Guest"/>
            <Hand>
                {playerHand}
            </Hand>

            <PlayerTag photoSrc="../../../public/Images/bot.png" playerName="Bot"/>
            <Hand>
                {bot1Hand}
            </Hand>

            {numberOfBots >= 2 && <>
            <PlayerTag photoSrc="../../../public/Images/bot.png" playerName="Bot"/>
            <Hand>{bot2Hand}</Hand></>}

            {numberOfBots == 3 && <>
            <PlayerTag photoSrc="../../../public/Images/bot.png" playerName="Bot"/>
            <Hand>{bot3Hand}</Hand></>}

            <CardDisplay symbol={current_card.symbol} suit={current_card.suit} backSide={current_card.backside}/>
            <CardDisplay symbol={""} suit={""} backSide/>
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