export function generateTop10CacheKey(quizId: string) {
    return `leaderboard-top10:${quizId}`;
}