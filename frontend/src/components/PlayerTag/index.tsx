import './playerTag.scss'

interface PlayerTagProps{
    photoSrc: string,
    playerName: string,
    inAction?: boolean
}

export default function PlayerTag(props: PlayerTagProps){
    return(
        <div id='player-tag' className={props.inAction ? "active" : ""}>
        <img id='player-photo' src={props.photoSrc}/>
        <div id='player-name'>{props.playerName}</div>
        </div>
    )
}