import { getName } from "./getBotName"

describe("getBotName", () => {
    it("Should give a name ending with -mir", () => {
        let result = getName()
        expect(result.endsWith("mir")).toBeTruthy()
    })
})