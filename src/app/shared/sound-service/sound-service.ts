import { currentWord } from '@shared/observables';
import { PATH } from '@shared/path';

export const soundService = {
    audioElem: new Audio(),
    currentWord(sideEffect?: () => {}) {
        const {
            word: { audioExample },
        } = currentWord.value;
        this.audioElem.src = PATH + audioExample;

        if (sideEffect) sideEffect();

        this.audioElem.play();
    },
};
