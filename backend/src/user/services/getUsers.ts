import {User} from "../models/user";
import UserRepository from "../repository/user-repository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../app/configs";

@injectable()
export default class GetUsers {
    constructor(
        @inject(TYPES.UserRepository)
        private userRepository: UserRepository
    ) {}

    execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}