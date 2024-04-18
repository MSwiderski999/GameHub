import './leaderboard.scss'

interface LeaderboardProps{
    data: [{minutes: string, seconds: string, username: string}]
}

export default function Leaderboard(props: LeaderboardProps){
    console.log(props.data)
    return(
         <div className="leaderboard">
            <h2>Top scores by time</h2>
            <ol>
                {props.data.map((row, index) => (
                    <li key={index}>{row.username} ---- {row.minutes}:{row.seconds}</li>
                ))}
            </ol>
         </div>
    )
}
