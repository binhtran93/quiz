export type User = {
    username: string;
}

export type Quiz = {
    id: string;
    name: string;
}

export type Question = {
    id: string;
    text: string;
    options: string[];
}