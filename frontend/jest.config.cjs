/** @type {import('jest').Config} */
const config = {
    moduleNameMapper:{
        "\\.(css|less|sass|scss)$":
            "<rootDir>/__mocks__/styleMock.js"
    },
    testEnvironment: "jsdom"
}

module.exports = config