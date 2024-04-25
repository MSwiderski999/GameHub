import Thumbnail from "../../components/Thumbnail";

export default function Home(){
    return (
        <>
        <Thumbnail name={"Uno"} imgsrc="../../../public/Images/uno-thumbnail.jpg" url="/uno"/>
        <Thumbnail name={"Memory"} imgsrc="../../../public/Images/memory-thumbnail.png" url="/memory"/>
        <Thumbnail name={"Candy Crush"} imgsrc="../../../public/Images/candy-crush-thumbnail.png" url="/candy-crush"/>
        </>
    )
}