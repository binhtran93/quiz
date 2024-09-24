export function generateLeaderboardCacheKey(quizId: string) {
    return `leaderboard:${quizId}`;
}