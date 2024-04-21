import { playField$ } from '@shared/observables';
import { PATH } from '@shared/path';

export const setFieldBackground = (imgPath?: string): void => {
    const playField = playField$.value;
    if (imgPath) {
        playField!.style.backgroundImage = `url(${PATH}/images/${imgPath})`;
    }
    if (playField!.style.backgroundImage && !imgPath) {
        playField!.style.backgroundImage = '';
    }
};
