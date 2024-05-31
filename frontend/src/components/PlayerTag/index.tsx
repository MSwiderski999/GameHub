import './playerTag.scss'

interface PlayerTagProps{
    photoSrc: string,
    playerName: string,
    inAction?: boolean
}

export default function PlayerTag(props: PlayerTagProps){
    return(
        <div id='player-tag' className={props.inAction ? "active" : ""} role='tag'>
        <img id='player-photo' src={props.photoSrc} alt='player-photo'/>
        <div id='player-name'>{props.playerName}</div>
        </div>
    )
}