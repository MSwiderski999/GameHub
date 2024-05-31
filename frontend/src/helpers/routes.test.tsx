import { routes } from "./routes"

describe("routes", () => {
    it("Should have 5 elements in array", () => {
        let result = routes.length
        expect(result).toStrictEqual(5)
    })
})