import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import PlayerTag from '.'

describe("InfoBox", () => {
    it("Should render playerTag with Test name", () => {
        render(<PlayerTag photoSrc={''} playerName={'Test'}/>)

        expect(screen.getByRole('tag')).toHaveTextContent("Test")
    })
})