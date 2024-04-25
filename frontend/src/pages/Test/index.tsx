import { useEffect, useState } from "react"
import "./candy-crush.scss"
import GameContainer from "../../components/GameContainer"
import blue from "../../../public/Images/candy/blue-candy.png"
import green from "../../../public/Images/candy/green-candy.png"
import orange from "../../../public/Images/candy/orange-candy.png"
import purple from "../../../public/Images/candy/purple-candy.png"
import red from "../../../public/Images/candy/red-candy.png"
import yellow from "../../../public/Images/candy/yellow-candy.png"
import blank from "../../../public/Images/candy/blank.png"
import { findValidMoves } from "./findValidMoves"

const width = 9
const colors = [
    blue, 
    green,
    orange,
    purple,
    red,
    yellow
]

export default function CandyCrush() {
    const [colorArrangement, setColorArrangement] = useState<string[]>([])
    const [tilesToRemove] = useState<boolean[]>([])
    const [draggedTile, setDraggedTile] = useState<any>(null)
    const [replacedTile, setReplacedTile] = useState<any>(null)

    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)]
            randomColorArrangement.push(randomColor)
            tilesToRemove[i] = false
        }
        setColorArrangement(randomColorArrangement)
    }

    const checkForVerticalMatches = () => {
        let removed = false
        for (let i = 0; i <= 62; i++) {
            const column: number[] = [i, i + width, i + width * 2]
            const decidedColor: string = colorArrangement[i]

            if (column.every(cell => colorArrangement[cell] === decidedColor)) {
                column.forEach(cell => tilesToRemove[cell] = true)
                removed = true
            }
        }
        return removed
    }

    const checkForHorizontalMatches = () => {
        const notValid = [7, 8, 16, 17, 25, 26, 34, 35, 43, 44, 52, 53, 61, 62, 70, 71]
        let removed = false

        for (let i = 0; i <= 78; i++) {
            if (notValid.includes(i)) continue

            const row: number[] = [i, i + 1, i + 2]
            const decidedColor: string = colorArrangement[i]

            if (row.every(cell => colorArrangement[cell] === decidedColor)) {
                row.forEach(cell => tilesToRemove[cell] = true)
                removed = true
            }
        }

        return removed
    }

    const removeTiles = () => {
        tilesToRemove.forEach((tile, index) => {
            if (tile) {
                colorArrangement[index] = blank
            }
        })
    }

    const clearTilesToRemove = () => {
        for(let i = 0; i < 81; i++){
            tilesToRemove[i] = false
        }
    }

    const moveDown = () => {
        let anyMoved = false
        for (let i = 71; i >= 0; i--) {
            if (colorArrangement[i + width] === blank) {
                anyMoved = true
                colorArrangement[i + width] = colorArrangement[i]
                colorArrangement[i] = blank
            }
        }
        return anyMoved
    }

    const generateTiles = () => {
        for (let i = 0; i <=8; i++){
            if (colorArrangement[i] === blank) {
                let randomColor = Math.floor(Math.random() * colors.length)
                colorArrangement[i] = colors[randomColor]
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

        colorArrangement[replacedId] = draggedTile.getAttribute('src')
        colorArrangement[draggedId] = replacedTile.getAttribute('src')

        const validMoves = findValidMoves(draggedId, width)

        const validMove = validMoves.includes(replacedId)

        const verticalMatch = checkForVerticalMatches()
        const horizontalMatch = checkForHorizontalMatches()

        if (replacedId
            && validMove
            && (verticalMatch || horizontalMatch)) {
                setDraggedTile(null)
                setReplacedTile(null)
        }
        else {
            colorArrangement[replacedId] = replacedTile.getAttribute('src')
            colorArrangement[draggedId] = draggedTile.getAttribute('src')

            setColorArrangement([...colorArrangement])
        }
    }

    useEffect(() => {
        createBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            if (!moveDown()) {
                checkForVerticalMatches()
                checkForHorizontalMatches()
            }
            removeTiles()
            clearTilesToRemove()
            generateTiles()
            setColorArrangement([...colorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForVerticalMatches, checkForHorizontalMatches, removeTiles, clearTilesToRemove, moveDown, generateTiles, colorArrangement])


    return (
        <GameContainer>
            <div className="candy-crush">
                <div className="board">
                    {colorArrangement.map((tile, index) => (
                        <img
                            key={index}
                            src={tile}
                            alt={tile}
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