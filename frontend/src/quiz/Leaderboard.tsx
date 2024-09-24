import {Table} from "react-bootstrap";
import socket from "../socket";
import {useEffect, useState} from "react";

type UserScore = {
    value: string;
    score: number;
    username: string;
}

type LeaderboardProps = {
    quizId: string;
}

export default function Leaderboard(props: LeaderboardProps) {
    const {quizId} = props;
    const [leaderboard, setLeaderboard] = useState<UserScore[]>([]);
    useEffect(() => {
        socket.on('leaderboard-updated', args => {
            // TODO Check quiz Id
            setLeaderboard(args);
        })
    }, []);

    useEffect(() => {
        async function fetchLeaderboard() {
            const res = await fetch(`http://localhost:5000/api/v1/leaderboard/${quizId}/top10`);
            const leaderboard = await res.json();
            setLeaderboard(leaderboard);
        }

        fetchLeaderboard();
    }, [quizId]);

    return (
        <>
            <h2>Leaderboard</h2>
            <Table striped>
                <thead>
                <tr>
                    <th>Score</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard.map(item => {
                    return (
                        <tr>
                            <td>{item.score}</td>
                            <td>{item.username}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </>
    )
}