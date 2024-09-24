import {UserScore} from "../models/UserScore";
import LeaderboardRepository from "./leaderboard-repository";
import {injectable} from "inversify";
import {users} from "../../fake";

@injectable()
export default class InMemoryLeaderboardRepository implements LeaderboardRepository {

    /**
     * Mock db data
     * @private
     */
    get(): Promise<UserScore[]> {
        const top10 = users.map((user, index) => {
            return {
                value: user.id,
                score: index < 3 ? 1 : 0,
            }
        })

        return Promise.resolve(top10);
    }
}