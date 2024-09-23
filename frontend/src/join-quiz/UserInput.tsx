import {ChangeEvent, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {User} from "../types";

type UserInputProp = {
    onChange: (username: string) => void;
}

export default function UserInput(props: UserInputProp) {
    const {onChange} = props;
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('http://localhost:5000/api/v1/users');

            const users = await res.json();
            setUsers(users);

            if (users.length > 0) {
                onChange(users[0].username);
            }
        }

        fetchUsers();
    }, []);

    const selectUser = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    }

    return (
        <Form.Group className="mb-3">
            <Form.Label>Select User</Form.Label>
                <Form.Select aria-label="Default select example" onChange={selectUser}>
                    {users.map((user) => (
                        <option value={user.username}>{user.username}</option>
                    ))}
            </Form.Select>
        </Form.Group>
    );
}