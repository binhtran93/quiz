export type UserScore = {
  value: string
  score: number
}

export type UserScoreWithUsername = UserScore & { username: string }
