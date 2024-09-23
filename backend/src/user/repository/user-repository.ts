import {User} from "../models/user";

export default interface UserRepository {
    findAll(): Promise<User[]>;
}
