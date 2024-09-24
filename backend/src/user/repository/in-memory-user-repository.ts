import {User} from "../models/user";
import {injectable} from "inversify";
import UserRepository from "./user-repository";
import {userId1, userId2, username1, username2} from "../../fake";

@injectable()
export default class InMemoryUserRepository implements UserRepository {
    private users: User[];

    constructor() {
        this.users = [
            {username: username1, id: userId1},
            {username: username2, id: userId2},
        ]
    }

    public findAll(): Promise<User[]> {
        return Promise.resolve(this.users);
    }
}
