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
    const [draggedTile, setDraggedTile] = useState<any>(null)
    const [replacedTile, setReplacedTile] = useState<any>(null)

    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 53; i++) {
            const columnOfFour: number[] = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor: string = colorArrangement[i]

            if (columnOfFour.every(cell => colorArrangement[cell] === decidedColor)) {
                columnOfFour.forEach(cell => colorArrangement[cell] = "")
                return true
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
                return true
            }
        }
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 62; i++) {
            const columnOfThree: number[] = [i, i + width, i + width * 2]
            const decidedColor: string = colorArrangement[i]

            if (columnOfThree.every(cell => colorArrangement[cell] === decidedColor)) {
                columnOfThree.forEach(cell => colorArrangement[cell] = "")
                return true
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
                return true
            }
        }
    }

    const moveBelow = () => {
        for (let i = 0; i <= 71; i++) {
            if (i <= 8 && colorArrangement[i] === "") {
                let randomColor = Math.floor(Math.random() * colors.length)
                colorArrangement[i] = colors[randomColor]
            }
            if (colorArrangement[i + width] === "") {
                colorArrangement[i + width] = colorArrangement[i]
                colorArrangement[i] = ""
            }
        }
    }

    const dragStart = (e: { target: any }) => {
        setDraggedTile(e.target)
    }

    const dragDrop = (e: { target: any }) => {
        setReplacedTile(e.target)
    }

    const dragEnd = () => {
        const draggedId = parseInt(draggedTile.getAttribute("data-id"))
        const replacedId = parseInt(replacedTile.getAttribute("data-id"))

        colorArrangement[replacedId] = draggedTile.style.backgroundColor
        colorArrangement[draggedId] = replacedTile.style.backgroundColor

        const validMoves = [
            draggedId - 1,
            draggedId - width,
            draggedId + 1,
            draggedId + width
        ]

        const validMove = validMoves.includes(replacedId)

        const columnOfFour = checkForColumnOfFour()
        const rowOfFour = checkForRowOfFour()
        const columnOfThree = checkForColumnOfThree()
        const rowOfThree = checkForRowOfThree()

        if (replacedId
            && validMove
            && (columnOfFour || rowOfFour || columnOfThree || rowOfThree)) {
                setDraggedTile(null)
                setReplacedTile(null)
        }
        else {
            colorArrangement[replacedId] = replacedTile.style.backgroundColor
            colorArrangement[draggedId] = draggedTile.style.backgroundColor

            setColorArrangement([...colorArrangement])
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
                            data-id={index}
                            draggable={true}
                            onDragStart={dragStart}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => e.preventDefault()}
                            onDragLeave={(e) => e.preventDefault()}
                            onDrop={dragDrop}
                            onDragEnd={dragEnd}
                        />
                    ))}
                </div>
            </div>
        </GameContainer>
    )
}