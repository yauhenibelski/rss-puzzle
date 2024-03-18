import { CurrentLevelRound } from '@interfaces/current-level';
import { autofillBtnDisabled, currentLevel as currentLevel$, currentWord } from '@shared/observables';
import { getCurrentWordByIndex } from '@shared/utils/get-current-word';
import { wordCollection } from '@shared/wordCollection';

export const setRoundOrLevel = ({ level, round }: CurrentLevelRound): void => {
    if (level > wordCollection.length) return;
    if (round > wordCollection[level].roundsCount) return;

    currentLevel$.publish({ level, round });
    currentWord.publish(getCurrentWordByIndex(0));

    if (autofillBtnDisabled.value) {
        autofillBtnDisabled.publish(false);
    }
};
