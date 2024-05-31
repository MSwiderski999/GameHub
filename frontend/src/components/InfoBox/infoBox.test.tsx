import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Infobox from '.'

describe("InfoBox", () => {
    it("Should render InfoBox with child", () => {
        render(<Infobox><div role='test-div'>Test</div></Infobox>)

        expect(screen.getByRole('test-div')).toHaveTextContent("Test")
    })
})