import { correctIncorrectSentence } from '@shared/observables';

export const clearCorrectIncorrectSentence = (): void => {
    correctIncorrectSentence.publish({
        correct: [],
        incorrect: [],
    });
};
