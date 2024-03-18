export interface LevelData {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
}

export interface Word {
    audioExample: string;
    textExample: string;
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
}
export interface Round {
    levelData: LevelData;
    words: Word[];
}
export interface WordCollection {
    rounds: Round[];
    roundsCount: number;
}
