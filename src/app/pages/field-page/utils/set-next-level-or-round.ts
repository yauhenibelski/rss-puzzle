import { currentLevel, currentWord } from '@shared/observables';
import { getCurrentWordByIndex } from '@shared/utils/get-current-word';
import { wordCollection } from '@shared/wordCollection';

export const setNextLevelOrRound = (): void => {
    const { level, round } = currentLevel.value;
    const rounds = wordCollection[level].roundsCount;

    let nextRound: number;
    let nextLevel: number;

    const isNextRoundInLevelExist = rounds - 1 >= round + 1;
    const isLevelExist = level + 1 <= wordCollection.length - 1;

    console.log(isNextRoundInLevelExist, isLevelExist);

    if (isNextRoundInLevelExist) {
        nextRound = round + 1;
        nextLevel = level;
    } else {
        nextLevel = isLevelExist ? level + 1 : 0;
        nextRound = 0;
    }
    console.log(nextLevel, nextRound);
    currentLevel.publish({
        level: nextLevel,
        round: nextRound,
    });
    currentWord.publish(getCurrentWordByIndex(0));
};
