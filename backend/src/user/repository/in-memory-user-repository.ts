import {User} from "../models/user";
import {injectable} from "inversify";

@injectable()
export default class InMemoryUserRepository {
    private users: User[];

    constructor() {
        this.users = [
            {username: 'tdbinh93'},
            {username: 'binh.tran'},
        ]
    }

    public findAll(): Promise<User[]> {
        return Promise.resolve(this.users);
    }
}
