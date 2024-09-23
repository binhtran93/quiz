import {User} from "../models/user";
import {injectable} from "inversify";
import UserRepository from "./user-repository";

@injectable()
export default class InMemoryUserRepository implements UserRepository {
    private users: User[];

    constructor() {
        this.users = [
            {username: 'tdbinh93', id: '123456'},
            {username: 'binh.tran', id: '654321'},
        ]
    }

    public findAll(): Promise<User[]> {
        return Promise.resolve(this.users);
    }
}
