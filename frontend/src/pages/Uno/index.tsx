import Card from "./Card";

export default function Uno(){
    return (
        <>
        <Card symbol="1" suit="blue" value={1} backSide></Card>
        <Card symbol="2" suit="green" value={2}></Card>
        <Card symbol="3" suit="red" value={3}></Card>
        <Card symbol="4" suit="yellow" value={4}></Card>
        </>
    )
}