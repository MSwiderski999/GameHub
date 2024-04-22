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

    const checkForColumnOfFour = () => {
        for (let i = 0; i < 60; i++) {
            const columnOfFour: number[] = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor: string = colorArrangement[i]

            if (columnOfFour.every(cell => colorArrangement[cell] === decidedColor)) {
                columnOfFour.forEach(cell => colorArrangement[cell] = "")
            }
        }
    }

    const checkForRowOfFour = () => {
        for (let i = 0; i < 81; i++) {
            const rowOfFour: number[] = [i, i + 1, i + 2, i + 3]
            const decidedColor: string = colorArrangement[i]
            const notValid = [6, 7, 8, 15, 16, 17, 24, 25, 26, 33, 34, 35, 42, 43, 44, 51, 52, 53, 60, 61, 62, 69, 70, 71, 78, 79, 80]

            if (notValid.includes(i)) continue

            if (rowOfFour.every(cell => colorArrangement[cell] === decidedColor)) {
                rowOfFour.forEach(cell => colorArrangement[cell] = "")
            }
        }
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i < 69; i++) {
            const columnOfThree: number[] = [i, i + width, i + width * 2]
            const decidedColor: string = colorArrangement[i]

            if (columnOfThree.every(cell => colorArrangement[cell] === decidedColor)) {
                columnOfThree.forEach(cell => colorArrangement[cell] = "")
            }
        }
    }

    const checkForRowOfThree = () => {
        for (let i = 0; i < 81; i++) {
            const rowOfThree: number[] = [i, i + 1, i + 2]
            const decidedColor: string = colorArrangement[i]
            const notValid = [7, 8, 16, 17, 25, 26, 34, 35, 43, 44, 52, 53, 61, 62, 70, 71, 79, 80]

            if (notValid.includes(i)) continue

            if (rowOfThree.every(cell => colorArrangement[cell] === decidedColor)) {
                rowOfThree.forEach(cell => colorArrangement[cell] = "")
            }
        }
    }

    const moveBelow = () => {
        for (let i = 0; i < 81 - width; i++) {
            if (colorArrangement[i + width] === "") {
                colorArrangement[i + width] = colorArrangement[i]
                colorArrangement[i] = ""
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
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveBelow()
            setColorArrangement([...colorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveBelow, colorArrangement])

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