import './leaderboard.scss'

interface LeaderboardProps{
    data: [{turns: string, username: string}]
}

export default function TurnsLeaderboard(props: LeaderboardProps){
    return(
         <div className="leaderboard right">
            <h2>Top scores by turns</h2>
            <table>
                {props.data.map((row, index) => (
                    <tr key={index}>
                        <td className="index-column">{index + 1}.</td>
                        <td className="username-column">{row.username}</td>
                        <td className="score-column">{row.turns}</td>
                    </tr>
                ))}
            </table>
         </div>
    )
}
