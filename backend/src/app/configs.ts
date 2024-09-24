const TYPES = {
    UserRepository: Symbol.for('UserRepository'),
    QuizRepository: Symbol.for('QuizRepository'),
    LeaderboardRepository: Symbol.for('LeaderboardRepository'),
};

const SOCKET_EVENTS = {
    LeaderboardUpdated: 'leaderboard-updated',
    JoinQuiz: 'join-quiz',
    LeaveQuiz: 'leave-quiz',
    SubmitAnswer: 'submit-answer',
}

export { TYPES, SOCKET_EVENTS };