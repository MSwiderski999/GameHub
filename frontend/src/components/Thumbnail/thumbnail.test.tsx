import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Thumbnail from '.'

describe("Thumbnail", () => {
    it("Should render InfoBox with child", () => {
        render(<Thumbnail name='Test' description='Description' url=''/>)

        expect(screen.getByText('Test')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
    })
})