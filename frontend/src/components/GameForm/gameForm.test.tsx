import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import GameForm from '.'

describe("GameForm", () => {
    it("Should return result equal 1 and 2", async () => {
        let result = 0
        render(<GameForm children={<div />} onSubmit={() => result += 1}/>)
        screen.getByRole("button").click()
        expect(result).toStrictEqual(1)
        screen.getByRole("button").click()
        expect(result).toStrictEqual(2)
    })
})