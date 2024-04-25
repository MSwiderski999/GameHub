export const findValidMoves = (id: number, width: number) => {
    const validIds: number[] = [id + width, id - width]
    if (id % 9 !== 0) {
        validIds.push(id - 1)
    }
    if (id % 9 !== 8) {
        validIds.push(id + 1)
    }
    const validMoves = validIds.filter(tile => tile >= 0 && tile < width * width)
    return validMoves
}