import UserScore from "../models/UserScore";

export default interface LeaderboardRepository {
    getTop10(): Promise<UserScore[]>;
}