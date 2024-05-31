import { names } from "./botNames"

describe("botNames", () => {
    it("Should have length of bot names", () => {
        let result = names.length
        expect(result > 1).toBeTruthy()
    })
})