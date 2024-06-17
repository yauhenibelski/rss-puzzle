import { currentWord$ } from '@shared/observables';
import { PATH } from '@shared/path';

interface Params {
    sideEffectStart?: () => void;
    sideEffectEnd?: () => void;
}

export const soundService = {
    audioElem: new Audio(),
    currentWord(params?: Params): void {
        const {
            word: { audioExample },
        } = currentWord$.value;
        this.audioElem.src = PATH + audioExample;

        this.audioElem.play();

        if (params && 'sideEffectStart' in params) {
            params.sideEffectStart!();
        }

        this.audioElem.onended = () => {
            if (params && 'sideEffectEnd' in params) {
                params.sideEffectEnd!();
            }
        };
    },
    play(audioExample: string): void {
        this.audioElem.src = PATH + audioExample;
        this.audioElem.play();
    },
};
