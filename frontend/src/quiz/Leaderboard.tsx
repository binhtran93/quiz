import {Table} from "react-bootstrap";
import socket from "../socket";
import {useEffect, useState} from "react";

type Rank = {
    value: string;
    score: number
}

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<Rank[]>([]);
    useEffect(() => {
        socket.on('leaderboard-updated', args => {
            setLeaderboard(args);
        })
    }, []);
    return (
        <>
            <h2>Leaderboard</h2>
            <Table striped>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard.map(item => {
                    return (
                        <tr>
                            <td>{item.score}</td>
                            <td>{item.value}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </>
    )
}