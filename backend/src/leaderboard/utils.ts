export function generateLeaderboardCacheKey(quizId: string) {
    return `leaderboard:${quizId}`;
}

export function generateLeaderboardLastModifiedCacheKey(quizId: string) {
    return `leaderboard-last-modified:${quizId}`;
}