import "./leaderboard.scss"

interface ScoreLeaderboardProps {
    data: [{username: string, score: string}]
}

export default function ScoreLeaderboard(props: ScoreLeaderboardProps) {
    return (
        <div className="leaderboard right">
           <h2>Top scores by tiles</h2>
            <table>
                {props.data.map((row, index) => (
                    <tr key={index}>
                        <td className="index-column">{index + 1}.</td>
                        <td className="username-column">{row.username}</td>
                        <td className="score-column">{row.score}</td>
                    </tr>
                ))}
            </table> 
        </div>
    )
}