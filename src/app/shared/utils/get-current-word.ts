import { CurrentLevelWord } from '@interfaces/current-word.interface';
import { currentLevel$ } from '@shared/observables';
import { wordCollection } from '@shared/wordCollection';

export const getCurrentWordByIndex = (wordIndex: number): CurrentLevelWord => {
    const { level, round } = currentLevel$.value;
    return {
        word: wordCollection[level].rounds[round].words[wordIndex],
        wordIndex,
    };
};
