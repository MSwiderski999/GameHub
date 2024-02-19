import { useState } from "react";
import GameForm from "../../components/GameForm";
import CardDisplay from "./CardDisplay";

export default function Uno(){
    const [active, setActive] = useState(false)
    const StartGame = () =>{
        setActive(true)
    }
    return (
        active
        ?
        <CardDisplay symbol="3" suit="blue" value={3}/>
        :
        <GameForm onSubmit={async () => StartGame()}>
            <>
            <p className="input-label">Number of bots</p>
            <div className="multiple-choice-container">
                <div className="multiple-choice">1</div>
                <div className="multiple-choice">2</div>
                <div className="multiple-choice">3</div>
            </div>

            <p className="input-label">Difficulty</p>
            <div className="multiple-choice-container">
                <div className="multiple-choice">Easy</div>
                <div className="multiple-choice">Medium</div>
                <div className="multiple-choice">Hard</div>
            </div>

            <p className="input-label">Mode</p>
            <div className="multiple-choice-container">
                <div className="multiple-choice">Single Game</div>
                <div className="multiple-choice">Best Of 5</div>
                <div className="multiple-choice">Best Of 10</div>
            </div>
            </>
        </GameForm>
    )
}