import './singleCard.scss'

interface SingleCardProps{
    src: string
    id: number
    revealed?: boolean
}

export default function SingleCard(props: SingleCardProps){
    return(
        <div className="card-container" key={props.id}>
            <div>
                    <div className="front"><img className="front-img" src={props.src} alt="card"/></div>
                    <div className="back"/>
            </div>
        </div>
    )
}