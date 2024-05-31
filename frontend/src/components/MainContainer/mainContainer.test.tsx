import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import MainContainer from '.'

describe("MainContainer", () => {
    it("Should render MainContainer with child", () => {
        render(<MainContainer><div role='test-div'>Test</div></MainContainer>)

        expect(screen.getByRole('test-div')).toHaveTextContent("Test")
    })
})