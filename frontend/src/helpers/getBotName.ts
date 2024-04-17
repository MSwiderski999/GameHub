import { names } from "./botNames"

const getName = () => {
    return names[Math.floor(Math.random() * names.length)]
}

export {getName}