import { useEffect, useState } from "react"
import "./candy-crush.scss"
import GameContainer from "../../components/GameContainer"

const width = 9
const colors = [
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "yellow"
]

export default function CandyCrush() {
    const [colorArrangement, setColorArrangement] = useState<string[]>([])

    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)]
            randomColorArrangement.push(randomColor)
        }
        setColorArrangement(randomColorArrangement)
    }

    useEffect(() => {
        createBoard()
    }, [])

    return (
        <GameContainer>
            <div className="candy-crush">
                <div className="board">
                    {colorArrangement.map((color, index) => (
                        <img key={index} style={{backgroundColor: color}}/>
                    ))}
                </div>
            </div>
        </GameContainer>
    )
}