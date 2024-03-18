import { currentLevel, currentWord } from '@shared/observables';
import { wordCollection } from '@shared/wordCollection';

export const hasNextWord = (): boolean => {
    const { level, round } = currentLevel.value;
    const { wordIndex } = currentWord.value;

    return wordCollection[level].rounds[round].words.length - 1 >= wordIndex + 1;
};
