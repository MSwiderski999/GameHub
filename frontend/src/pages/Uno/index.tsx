import { ReactElement, useEffect, useState } from "react";
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
import { pick_suit, play_random, play_mixed, play_optimal } from "./Functions/playCard";
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

    const [infoMessage, setInfoMessage] = useState(<div>Good luck!</div>)

    let action_index = Math.floor(Math.random() * 4)
    //#endregion
    
    useEffect(() => () => setActive(false), [])

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
            deck: temp_deck,
            turn_increment: 3
        }
        let play
        if(difficulty === "easy"){
            play = (hand: Card[], curr_card: Card) => {
                return play_random(hand, curr_card)
            }
        }
        else if(difficulty === "medium"){
            play = (hand: Card[], curr_card: Card) => {
                return play_mixed(hand, curr_card)
            }
        }
        else{
            play = (hand: Card[], curr_card: Card) => {
                return play_optimal(hand, curr_card)
            }
        }
        //#endregion

        //#region distributing cards
        for(let i = 0; i < 28; i++){
            const taken : Card = take(game.deck)
            await delay(35)
            game.players[i % 4].hand.push(taken)
            add_to_hand(i % 4, taken)
        }
        sort_hand(game.players[0].hand)
        update_hand(0, game.players[0].hand)
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

        let used_cards : Card[] = []

        //#region game loop
        while(game.players[action_index].hand.length > 0){
            let next_player = (action_index + game.turn_increment) % 4
            console.log(next_player)

            await delay(500)
            setInfoMessage(<div><span className="player-name">{game.players[action_index].name}</span>'s turn!</div>)
            await delay(1000)
            let played_card_id = play(game.players[action_index].hand, game.current_card)
            if(played_card_id === null){//draw extra card
                setInfoMessage(<div><span className="player-name">{game.players[action_index].name}</span> draws a card</div>)
                await delay(1000)
                let taken = take(game.deck)
                game.players[action_index].hand.push(taken)
                add_to_hand(action_index, taken)

                played_card_id = play(game.players[action_index].hand, game.current_card)
            }
            if(played_card_id !== null){
                setInfoMessage(<div><span className="player-name">{game.players[action_index].name}</span> plays a card</div>)
                await delay(1000)
                let played_card = game.players[action_index].hand.filter((card) => card.id === played_card_id)[0]
                game.players[action_index].hand = game.players[action_index].hand.filter((card) => card.id !== played_card_id)

                //update current card and hand
                used_cards.push(played_card)
                game.current_card = played_card
                setCurrentCard({suit: played_card.suit, symbol: played_card.symbol, backside: false, id: played_card.id})
                update_hand(action_index, game.players[action_index].hand)

                //change color
                if(played_card.suit === "changeColor"){
                    await delay(1000)
                    played_card.suit = pick_suit(game.players[action_index].hand)
                    setCurrentCard({suit: played_card.suit, symbol: played_card.symbol, backside: false, id: played_card.id})
                }

                //end game if a player wins
                if(game.players[action_index].hand.length === 0){
                    setInfoMessage(<div><span className="player-name">{game.players[action_index].name}</span><span className="keyword"> wins!</span></div>)
                    break
                }

                switch(played_card.symbol){
                    case '⊖':
                        setInfoMessage(<div><span className="player-name">{game.players[next_player].name}</span><span className="danger"> skips a turn!</span></div>)
                        action_index += game.turn_increment
                        break
                    case '❏':
                        setInfoMessage(<div><span className="player-name">{game.players[next_player].name}</span><span className="danger"> draws 2 cards!</span></div>)
                        for(let i = 0; i < 2; i++){
                            let taken = take(game.deck)
                            await delay(500)
                            game.players[next_player].hand.push(taken)
                            update_hand(next_player, game.players[next_player].hand)

                            sort_hand(game.players[0].hand)
                            update_hand(0, game.players[0].hand)
                        }
                        action_index += game.turn_increment
                        break
                    case '🗇':
                        setInfoMessage(<div><span className="player-name">{game.players[next_player].name}</span><span className="danger"> draws 4 cards!</span></div>)
                        for(let i = 0; i < 4; i++){
                            let taken = take(game.deck)
                            await delay(500)
                            game.players[next_player].hand.push(taken)
                            update_hand(next_player, game.players[next_player].hand)

                            sort_hand(game.players[0].hand)
                            update_hand(0, game.players[0].hand)
                        }
                        action_index += game.turn_increment
                        break
                    case '⥂':
                        setInfoMessage(<div><span className="keyword">Direction</span><span> changed!</span></div>)
                        await delay(1000)
                        game.turn_increment = game.turn_increment === 1 ? 3 : 1
                        break
                }
            }
            action_index = (action_index + game.turn_increment) % 4

            //refill deck
            if(game.deck.length <= 4){
                game.deck.concat(shuffle(used_cards))
                used_cards = []
            }
        }
        //#endregion
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
                <div id="deck"><CardDisplay symbol={""} suit={""} backSide facing="down" id={current_card.id}/></div>
            </div>

            <Infobox>{infoMessage}</Infobox>
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