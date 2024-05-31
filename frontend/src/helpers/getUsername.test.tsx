import { getUsername } from "./getUsername"

describe("getUsername", () => {
    it("Should return username Test", () => {
        let result = getUsername(1)
        expect(result).toStrictEqual("test")
    })
    it("Should return username Guest", () => {
        let result = getUsername(undefined)
        expect(result).toStrictEqual("Guest")
    })
})