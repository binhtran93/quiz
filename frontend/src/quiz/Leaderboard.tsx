import {Table} from "react-bootstrap";

export default function Leaderboard() {
    return (
        <>
            <h2>Leaderboard</h2>
            <Table striped>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
        </>
    )
}