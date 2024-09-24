import {User} from "../models/user";

export default interface UserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
}
