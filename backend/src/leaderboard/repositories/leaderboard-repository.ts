import { UserScore } from '../models/UserScore'

export default interface LeaderboardRepository {
  get(): Promise<UserScore[]>
}
