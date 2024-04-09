import { ReactElement, useState } from "react";
import GameForm from "../../components/GameForm";
import CardDisplay from "./CardDisplay";
import { Game } from "./Entities/game";
import { Deck, shuffle, sort_hand, take } from "./Entities/deck";
import GameContainer from "../../components/GameContainer";
import '../../../public/Images/guest.png'
import '../../../public/Images/bot.png'
import PlayerTag from "../../components/PlayerTag";
import Hand from "./HandDisplay";
import { Card } from "./Entities/card";
import './uno.scss'
import { getName } from "../../helpers/getBotName";
import { play_optimal } from "./Functions/playCard";
import { act } from "react-dom/test-utils";
import Infobox from "../../components/InfoBox";

export default function Uno(){
    //#region general hooks

    const [active, setActive] = useState(false)

    const [gamesTotal, setGamesTotal] = useState(1)
    const [difficulty, setDifficulty] = useState("easy")

    const [current_card, setCurrentCard] = useState({
        symbol: "",
        suit: "",
        backside: true,
        id: -1
    })

    const [botNames] = useState([getName(), getName(), getName()])

    const [playerHand, setPlayerHand] = useState(new Array<ReactElement>)
    const [bot1Hand, setBot1Hand] = useState(new Array<ReactElement>)
    const [bot2Hand, setBot2Hand] = useState(new Array<ReactElement>)
    const [bot3Hand, setBot3Hand] = useState(new Array<ReactElement>)

    const [infoMessage, setInfoMessage] = useState("Good luck!")

    let action_index = Math.floor(Math.random() * 4)
    //#endregion
    
    //#region add card to hand
    const add_to_hand = (action_index: number, card: Card) => {
        switch(action_index){
            case 0:
                setPlayerHand(playerHand => [...playerHand, <div className="card-container">
                    <CardDisplay suit={card.suit} symbol={card.symbol} facing="down" id={card.id}/></div>])
                break
            case 1:
                setBot1Hand(bot1Hand => [...bot1Hand, <div className="card-container">
                    <CardDisplay suit={card.suit} symbol={card.symbol} backSide facing="left" id={card.id}/></div>])
                break
            case 2:
                setBot2Hand(bot2Hand => [...bot2Hand, <div className="card-container">
                    <CardDisplay suit={card.suit} symbol={card.symbol} backSide facing="up" id={card.id}/></div>])
                break
            case 3:
                setBot3Hand(bot3Hand => [...bot3Hand, <div className="card-container">
                    <CardDisplay suit={card.suit} symbol={card.symbol} backSide facing="right" id={card.id}/></div>])
                break
        }
    }
    //#endregion

    //#region update hand
    const update_hand = (action_index: number, hand: Card[]) => {
        switch(action_index){
            case 0:
                setPlayerHand([])
                hand.forEach(card => {
                    setPlayerHand(playerHand => [...playerHand, <div className="card-container">
                    <CardDisplay suit={card.suit} symbol={card.symbol} facing="down" id={card.id}/></div>])
                })
                break
            case 1:
                setBot1Hand([])
                hand.forEach(card => {
                    setBot1Hand(bot1Hand => [...bot1Hand, <div className="card-container">
                    <CardDisplay suit={card.suit} symbol={card.symbol} facing="left" backSide id={card.id}/></div>])
                })
                break
            case 2:
                setBot2Hand([])
                hand.forEach(card => {
                    setBot2Hand(bot2Hand => [...bot2Hand, <div className="card-container">
                    <CardDisplay suit={card.suit} symbol={card.symbol} facing="up" backSide id={card.id}/></div>])
                })
                break
            case 3:
                setBot3Hand([])
                hand.forEach(card => {
                    setBot3Hand(bot3Hand => [...bot3Hand, <div className="card-container">
                    <CardDisplay suit={card.suit} symbol={card.symbol} facing="right" backSide id={card.id}/></div>])
                })
                break
        }
    }
    //#endregion

    const StartGame = async () =>{
        setActive(true)
        const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms)) //delay for smooth animation

        //#region create a game object
        let temp_deck = shuffle(Deck)
        const game: Game = {
            gamesTotal: 0,
            gamesPlayed: 0,
            players: [{name: "Guest", hand: [], ai: false}, {name: botNames[0], hand: [], ai: true}, {name: botNames[1], hand: [], ai: true}, {name: botNames[2], hand: [], ai: true}],
            current_card: take(temp_deck),
            deck: temp_deck
        }
        //#endregion

        //#region distributing cards
        for(let i = 0; i < 28; i++){
            const taken : Card = take(game.deck)
            await delay(35)
            game.players[i % 4].hand.push(taken)
            add_to_hand(i % 4, taken)
        }
        game.current_card = take(game.deck)
        setCurrentCard({suit: game.current_card.suit, symbol: game.current_card.symbol, backside: false, id: game.current_card.id})
        if(game.current_card.suit == "changeColor"){
            await delay(500)
            var r = Math.floor(Math.random() * 4)
            switch(r){
                case 0:
                    setCurrentCard({suit: "blue", symbol: game.current_card.symbol, backside: false, id: game.current_card.id})
                    break
                case 1:
                    setCurrentCard({suit: "green", symbol: game.current_card.symbol, backside: false, id: game.current_card.id})
                    break
                case 2:
                    setCurrentCard({suit: "red", symbol: game.current_card.symbol, backside: false, id: game.current_card.id})
                    break
                case 3:
                    setCurrentCard({suit: "yellow", symbol: game.current_card.symbol, backside: false, id: game.current_card.id})
                    break
            }
        }
        //#endregion

        //game

        while(game.players[action_index].hand.length > 0){
            action_index = (action_index + 1) % 4
            await delay(500)
            setInfoMessage(game.players[action_index].name + "'s turn!")
            await delay(1000)
            game.players[action_index].hand.splice(0, 1)
            update_hand(action_index, game.players[action_index].hand)
        }
        //game ; END
    }
    return (
        active
        ?
        <GameContainer>
            <div id="bottom">
            <div id="bottom-tag"><PlayerTag photoSrc="../../../public/Images/guest.png" playerName="Guest"/></div>
            <div id="bottom-hand"><Hand player>{playerHand}</Hand></div></div>

            <div id="left">
            <div id="left-tag"><PlayerTag photoSrc="../../../public/Images/bot.png" playerName={botNames[0]}/></div>
            <div id="left-hand"><Hand rotated>{bot1Hand}</Hand></div></div>

            <div id="top">
            <div id="top-tag"><PlayerTag photoSrc="../../../public/Images/bot.png" playerName={botNames[1]}/></div>
            <div id="top-hand"><Hand>{bot2Hand}</Hand></div></div>

            <div id="right">
            <div id="right-tag"><PlayerTag photoSrc="../../../public/Images/bot.png" playerName={botNames[2]}/></div>
            <div id="right-hand"><Hand rotated>{bot3Hand}</Hand></div></div>

            <div id="center-cards">
                <CardDisplay symbol={current_card.symbol} suit={current_card.suit} backSide={current_card.backside} facing="down" id={current_card.id}/>
                <CardDisplay symbol={""} suit={""} backSide facing="down" id={current_card.id}/>
            </div>

            <Infobox><div>{infoMessage}</div></Infobox>
        </GameContainer>
        :
        <GameForm onSubmit={async () => StartGame()}>
            <>
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