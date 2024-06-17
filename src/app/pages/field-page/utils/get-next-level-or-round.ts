import { CurrentLevelRound } from '@interfaces/current-level.interface';
import { currentLevel$ } from '@shared/observables';
import { wordCollection } from '@shared/wordCollection';

export const getNextLevelOrRound = (): CurrentLevelRound => {
    const { level, round } = currentLevel$.value;
    const rounds = wordCollection[level].roundsCount;

    let nextRound: number;
    let nextLevel: number;

    const isNextRoundInLevelExist = rounds - 1 >= round + 1;
    const isLevelExist = level + 1 <= wordCollection.length - 1;

    if (isNextRoundInLevelExist) {
        nextRound = round + 1;
        nextLevel = level;
    } else {
        nextLevel = isLevelExist ? level + 1 : 0;
        nextRound = 0;
    }

    return {
        level: nextLevel,
        round: nextRound,
    };
};
