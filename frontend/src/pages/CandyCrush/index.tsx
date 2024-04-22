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

    const checkForColumnOfThree = () => {
        for (let i = 0; i < 69; i++) {
            const columnOfThree: number[] = [i, i + width, i + width * 2]
            const decidedColor: string = colorArrangement[i]

            if (columnOfThree.every(cell => colorArrangement[cell] === decidedColor)) {
                columnOfThree.forEach(cell => colorArrangement[cell] = "")
            }
        }
    }

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

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfThree()
            setColorArrangement([...colorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfThree])

    return (
        <GameContainer>
            <div className="candy-crush">
                <div className="board">
                    {colorArrangement.map((color, index) => (
                        <img
                            key={index}
                            style={{backgroundColor: color}}
                            alt={color}
                        />
                    ))}
                </div>
            </div>
        </GameContainer>
    )
}