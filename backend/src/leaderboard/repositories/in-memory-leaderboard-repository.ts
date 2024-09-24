import UserScore from "../models/UserScore";
import LeaderboardRepository from "./leaderboard-repository";
import {userId1, userId2, username1, username2} from "../../fake";
import {nanoid} from "nanoid";
import {injectable} from "inversify";

@injectable()
export default class InMemoryLeaderboardRepository implements LeaderboardRepository {
    getTop10(): Promise<UserScore[]> {
        const fakeData = [
            {
                userId: userId1,
                username: username1,
                score: 0,
            },
            {
                userId: userId2,
                username: username2,
                score: 0,
            },
            {
                userId: nanoid(),
                username: 'Oliver',
                score: 1
            },
            {
                userId: nanoid(),
                username: 'Emma',
                score: 0
            },
            {
                userId: nanoid(),
                username: 'Liam',
                score: 0
            },
            {
                userId: nanoid(),
                username: 'Sophia',
                score: 1
            },
            {
                userId: nanoid(),
                username: 'Ava',
                score: 1
            }
        ]

        return Promise.resolve(fakeData);
    }
}