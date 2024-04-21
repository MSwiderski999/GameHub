import './leaderboard.scss'

interface LeaderboardProps{
    data: [{minutes: string, seconds: string, username: string}]
}

export default function TimeLeaderboard(props: LeaderboardProps){
    return(
         <div className="leaderboard left">
            <h2>Top scores by time</h2>
            <table>
                {props.data.map((row, index) => (
                    <tr key={index}>
                        <td className="index-column">{index + 1}.</td>
                        <td className="username-column">{row.username}</td>
                        <td className="time-column">{row.minutes}:{row.seconds}</td>
                    </tr>
                ))}
            </table>
         </div>
    )
}
