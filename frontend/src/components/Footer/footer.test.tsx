import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '.'

describe("Footer", () => {
    it("Should render a footer with correct text", async () => {
        render(<Footer/>)
        expect(screen.getByRole('footer')).toHaveTextContent("Autor: Mikołaj Świderski - kl. 4E")
    })
})