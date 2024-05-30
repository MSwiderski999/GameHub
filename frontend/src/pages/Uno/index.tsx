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
import { useAuth } from "../../helpers/checkAuth";
import axios from "axios";
import { isPlayable } from "./Functions/isPlayable";
import ColorChangeUI from "./ColorChangeUI";

export default function Uno(){
    const auth = useAuth()
    const [username, setUsername] = useState<string>("Player")

    const [active, setActive] = useState(false)

    const [gamesTotal, setGamesTotal] = useState(1)
    const [difficulty, setDifficulty] = useState("easy")
    const [botNames] = useState([getName(), getName(), getName()])
    const [game, setGame] = useState<Game>({gamesPlayed: 0,
        gamesTotal: 1,
        players: [{name: "Player", hand: [], ai: false}, {name: botNames[0], hand: [], ai: true}, {name: botNames[1], hand: [], ai: true}, {name: botNames[2], hand: [], ai: true}],
        deck: Deck,
        current_card: Deck[0],
        turn_increment: 1})

    const setCurrentCard = (card: Card) => {
        let old = game
        old.current_card = card
        setGame(old)
    }

    const flipPlayDirection = () => {
        let old = game
        old.turn_increment = old.turn_increment == 1 ? 3 : 1
        setGame(old)
    }

    const removeCardFromHand = (playerIndex: number, cardID: number) => {
        let old = game
        old.players[playerIndex].hand = old.players[playerIndex].hand.filter(card => {
            return card.id !== cardID
        })
        setGame(old)
    }

    const takeFromDeck = (playerIndex: number) => {
        let old = game
        old.players[playerIndex].hand.push(take(old.deck))
        setGame(old)
    }

    const recycleUsedCards = () => {
        let old = game
        old.deck.concat(shuffle(used_cards))
        setGame(old)
        used_cards = []
    }

    const [infoMessage, setInfoMessage] = useState(<div>Good luck!</div>)
    const [colorSelectionUI, setColorSelectionUI] = useState<ReactElement | null>(null)
    const [gameOverMessage, setGameOverMessage] = useState<ReactElement | null>(null)

    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms)) //delay for smooth animation

    let used_cards : Card[] = []
    let action_index = Math.floor(Math.random() * 4)
    let play: (hand: Card[], curr_card: Card) => number | null
    const [actionOnPlayer, setActionOnPlayer] = useState<boolean>(false)

    const getPlayerUsername = () => {
        axios.defaults.withCredentials = true
        const url = "http://localhost:3000/accounts/" + auth
        axios.post(url)
            .then(res => {
                if(res.status === 200){
                    setUsername(res.data.toString())
                }
            })
            .catch(err => console.log(err))
    }

    const handleCheckChangeColor = (id: number) => {
        if(actionOnPlayer){
            action_index = 0
            const targetCard = game.players[0].hand.filter((card) => {
                return card.id === id
            })[0]

            if(isPlayable(targetCard, game.current_card)){
                if(targetCard.value == 50){
                    setColorSelectionUI(<ColorChangeUI targetCardID={id} nextFunction={handlePlay}/>)
                }
                else{
                    handlePlay(id, null)
                }
            }else{console.log("unplayable")}
        }
    }

    const handlePlay = async (id: number, selectedColor: string | null) => {
        setColorSelectionUI(null)
        const targetCard = game.players[0].hand.filter((card) => {
            return card.id === id
        })[0]
        
        setCurrentCard(targetCard)
        removeCardFromHand(0, targetCard.id)

        if(game.players[0].hand.length === 0){
            handleGameOver()
        }

        if(targetCard.value == 50 && selectedColor != null){
                targetCard.suit = selectedColor
                setCurrentCard(targetCard)
            }

        let next_player = (action_index + game.turn_increment) % 4
        switch(targetCard.symbol){
            case '⊖':
                setInfoMessage(<div><span className="player-name">{game.players[next_player].name}</span><span className="danger"> skips a turn!</span></div>)
                action_index += game.turn_increment
                break
            case '❏':
                setInfoMessage(<div><span className="player-name">{game.players[next_player].name}</span><span className="danger"> draws 2 cards!</span></div>)
                for(let i = 0; i < 2; i++){
                    takeFromDeck(next_player)
                    await delay(500)
                }
                action_index += game.turn_increment
                break
            case '🗇':
                setInfoMessage(<div><span className="player-name">{game.players[next_player].name}</span><span className="danger"> draws 4 cards!</span></div>)
                for(let i = 0; i < 4; i++){
                    takeFromDeck(next_player)
                    await delay(500)
                }
                action_index += game.turn_increment
                break
            case '⥂':
                setInfoMessage(<div><span className="keyword">Direction</span><span> changed!</span></div>)
                await delay(1000)
                flipPlayDirection()
                break
        }

        setActionOnPlayer(false)
        action_index = (action_index + game.turn_increment) % 4
        handleBotPlay()
    }

    const revealCards = () => {
        let old = game
            for(let i = 1; i <=3 ; i++){
                old.players[i].hand.forEach(card => {
                    card.backside = false
                })
            }
            setGame(old)
    }

    const handleBotPlay = async () => {
        if(game.players[0].hand.length == 0){
            setInfoMessage(<div><span className="player-name">{username}</span> wins!</div>)
            revealCards()
            return
        }
        while(action_index !== 0){
            let next_player = (action_index + game.turn_increment) % 4

            await delay(500)
            setInfoMessage(<div><span className="player-name">{game.players[action_index].name}</span>'s turn!</div>)

            //#region bot play
            await delay(1000)
            buildPlayFunction()
            let played_card_id = play(game.players[action_index].hand, game.current_card)
            if(played_card_id === null){//draw extra card
                setInfoMessage(<div><span className="player-name">{game.players[action_index].name}</span> draws a card</div>)
                await delay(1000)
                takeFromDeck(action_index)

                played_card_id = play(game.players[action_index].hand, game.current_card)
            }
            if(played_card_id !== null){
                setInfoMessage(<div><span className="player-name">{game.players[action_index].name}</span> plays a card</div>)
                await delay(1000)

                let played_card = game.players[action_index].hand.filter((card) => card.id === played_card_id)[0]

                removeCardFromHand(action_index, played_card_id)

                //update current card and hand
                used_cards.push(played_card)
                setCurrentCard(played_card)

                //change color
                if(played_card.suit === "changeColor"){
                    await delay(1000)
                    played_card.suit = pick_suit(game.players[action_index].hand)
                    setCurrentCard(played_card)
                }

                if(game.players[action_index].hand.length === 0){
                    handleGameOver()
                    return
                }

                switch(played_card.symbol){
                    case '⊖':
                        setInfoMessage(<div><span className="player-name">{game.players[next_player].name}</span><span className="danger"> skips a turn!</span></div>)
                        action_index += game.turn_increment
                        break
                    case '❏':
                        setInfoMessage(<div><span className="player-name">{game.players[next_player].name}</span><span className="danger"> draws 2 cards!</span></div>)
                        for(let i = 0; i < 2; i++){
                            takeFromDeck(next_player)
                        }
                        action_index += game.turn_increment
                        break
                    case '🗇':
                        setInfoMessage(<div><span className="player-name">{game.players[next_player].name}</span><span className="danger"> draws 4 cards!</span></div>)
                        for(let i = 0; i < 4; i++){
                            takeFromDeck(next_player)
                        }
                        action_index += game.turn_increment
                        break
                    case '⥂':
                        setInfoMessage(<div><span className="keyword">Direction</span><span> changed!</span></div>)
                        await delay(1000)
                        flipPlayDirection()
                        break
                }
            }
            action_index = (action_index + game.turn_increment) % 4
            //#endregion

            //refill deck
            if(game.deck.length <= 4){
                recycleUsedCards()
            }
        }
        
        await delay(500)
        setInfoMessage(<div><span className="player-name">{game.players[action_index].name}</span>'s turn!</div>)
        let playerPlay = play(game.players[0].hand, game.current_card)
        if(playerPlay == null){
            takeFromDeck(0)
        }
        playerPlay = play(game.players[0].hand, game.current_card)
        if(playerPlay == null){
            action_index = game.turn_increment
            handleBotPlay()
        }
        else{
            setActionOnPlayer(true)
        }
    }

    const buildGame = () => {
        let temp_deck = shuffle(Deck)
        setGame({
            gamesTotal: gamesTotal,
            gamesPlayed: 0,
            players: [{name: "Player", hand: [], ai: false}, {name: botNames[0], hand: [], ai: true}, {name: botNames[1], hand: [], ai: true}, {name: botNames[2], hand: [], ai: true}],
            current_card: take(temp_deck),
            deck: temp_deck,
            turn_increment: 1
        })
    }

    const buildPlayFunction = () => {
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
    }

    const distributeCards = async () => {
        for(let i = 0; i < 28; i++){
            takeFromDeck(i % 4)
        }
        setCurrentCard(game.deck[Math.floor(Math.random() * game.deck.length)])
        if(game.current_card.suit == "changeColor"){
            await delay(500)
            var r = Math.floor(Math.random() * 4)
            switch(r){
                case 0:
                    setCurrentCard({suit: "blue", symbol: game.current_card.symbol, value: game.current_card.value, id: game.current_card.id})
                    break
                case 1:
                    setCurrentCard({suit: "green", symbol: game.current_card.symbol, value: game.current_card.value, id: game.current_card.id})
                    break
                case 2:
                    setCurrentCard({suit: "red", symbol: game.current_card.symbol, value: game.current_card.value, id: game.current_card.id})
                    break
                case 3:
                    setCurrentCard({suit: "yellow", symbol: game.current_card.symbol, value: game.current_card.value, id: game.current_card.id})
                    break
            }
        }
    }

    const StartGame = async () =>{
        setActive(true)

        //create a game object
        buildGame()
        buildPlayFunction()

        //distribute starting 7 cards
        await distributeCards()

        //assign player's name to the game object
        let old = game
        old.players[0].name = username
        setGame(old)

        handleBotPlay()
    }

    const calculateHandValue = (hand: Card[]) => {
        let value = 0
        hand.forEach(card => {
            value += card.value
        })
        return value
    }

    const handleGameOver = () => {
        let oldPoints: {player: string, handValue: number}[] = []
        game.players.forEach(player => {
            oldPoints.push({player: player.name, handValue: calculateHandValue(player.hand)})
        })
        oldPoints = oldPoints.sort(({handValue:a}, {handValue:b}) => a-b)

        setGameOverMessage(
        <div className="tinted">
            <div className="game-over-message">
                <h1>Game over!</h1>
                <ol>
                {oldPoints.map(score => <li>{score.player}: {score.handValue}</li>)}
                </ol>
                <button onClick={() => {window.location.reload()}}>Play again</button>
            </div>
        </div>)

        let playerScore = 0
        let playerPlace = 0
        for(let i = 3; i >= 0; i--){
            if(oldPoints[i].player !== "Player"){
                playerScore += oldPoints[i].handValue
            }
            else{
                playerPlace = i + 1
                break
            }
        }
        const values = {
            user: auth,
            mode: difficulty,
            score: playerScore,
            place: playerPlace
        }
        axios.defaults.withCredentials = true
        axios.post('http://localhost:3000/uno', values)
                .then(res => {
                    if (res.data.status !== 201) {
                        console.log(res.data.Message)
                    }
                })
                .catch(err => console.log(err))
    }

    useEffect(() => {
        if(game.players[0].hand != undefined){
            let old = game
            sort_hand(old.players[0].hand)
            setGame(old)
        }   
    }, [game.players[0].hand])

    return (
        active
        ?
        <GameContainer>
            <div id="bottom">
            <div id="bottom-tag"><PlayerTag photoSrc="../../../public/Images/guest.png" playerName={username}/></div>
            <div id="bottom-hand"><Hand player>{game.players[0].hand.map((card) => <div className="card-container" key={card.id} onClick={() => handleCheckChangeColor(card.id)}><CardDisplay symbol={card.symbol} suit={card.suit} id={card.id} facing="down"/></div>)}</Hand></div></div>

            <div id="left">
            <div id="left-tag"><PlayerTag photoSrc="../../../public/Images/bot.png" playerName={botNames[0]}/></div>
            <div id="left-hand"><Hand rotated>{game.players[1].hand.map((card) => <div className="card-container" key={card.id}><CardDisplay suit={card.suit} symbol={card.symbol} backSide facing="left" id={card.id}/></div>)}</Hand></div></div>

            <div id="top">
            <div id="top-tag"><PlayerTag photoSrc="../../../public/Images/bot.png" playerName={botNames[1]}/></div>
            <div id="top-hand"><Hand>{game.players[2].hand.map((card) => <div className="card-container" key={card.id}><CardDisplay suit={card.suit} symbol={card.symbol} backSide facing="up" id={card.id}/></div>)}</Hand></div></div>

            <div id="right">
            <div id="right-tag"><PlayerTag photoSrc="../../../public/Images/bot.png" playerName={botNames[2]}/></div>
            <div id="right-hand"><Hand rotated>{game.players[3].hand.map((card) => <div className="card-container" key={card.id}><CardDisplay suit={card.suit} symbol={card.symbol} backSide facing="right" id={card.id}/></div>)}</Hand></div></div>

            <div id="center-cards">
                <CardDisplay symbol={game.current_card.symbol} suit={game.current_card.suit} backSide={game.current_card.backside} facing="down" id={game.current_card.id}/>
                <div id="deck"><CardDisplay symbol={""} suit={""} backSide facing="down" id={game.current_card.id}/></div>
            </div>

            <Infobox>{infoMessage}</Infobox>
            {colorSelectionUI}
            {gameOverMessage}

        </GameContainer>
        :
        <GameForm onSubmit={async () => {
            StartGame()
            getPlayerUsername()
        }}>
            <>
            <p className="input-label">Difficulty</p>
            <div className="multiple-choice-container">
                <div className={difficulty === "easy"? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setDifficulty("easy")}>Easy</div>
                <div className={difficulty === "medium"? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setDifficulty("medium")}>Medium</div>
                <div className={difficulty === "hard"? "multiple-choice multiple-choice-selected" : "multiple-choice"} onClick={()=>setDifficulty("hard")}>Hard</div>
            </div>
            </>
        </GameForm>
    )
}