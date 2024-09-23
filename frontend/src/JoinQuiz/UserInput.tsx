import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {User} from "../types";

export default function UserInput() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('http://localhost:5000/api/v1/users');

            const users = await res.json();
            setUsers(users);
        }

        fetchUsers();
    }, []);

    return (
        <Form.Group className="mb-3">
            <Form.Label>Select User</Form.Label>
                <Form.Select aria-label="Default select example">
                    {users.map((user) => (
                        <option value={user.username}>{user.username}</option>
                    ))}
            </Form.Select>
        </Form.Group>
    );
}