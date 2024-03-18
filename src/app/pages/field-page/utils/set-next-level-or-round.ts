import { currentLevel, currentWord } from '@shared/observables';
import { getCurrentWordByIndex } from '@shared/utils/get-current-word';
import { getNextLevelOrRound } from './get-next-level-or-round';

export const setNextLevelOrRound = (): void => {
    currentLevel.publish(getNextLevelOrRound());
    currentWord.publish(getCurrentWordByIndex(0));
};
