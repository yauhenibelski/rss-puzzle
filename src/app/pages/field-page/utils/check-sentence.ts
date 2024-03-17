import { canCheck, canContinue, playField as playField$, currentWord } from '@shared/observables';
import { setColorBackground } from './set-color-background';

export const checkSentence = (): void => {
    const playField = playField$.value;

    const currentResultLine = <HTMLDivElement>[...playField!.childNodes][currentWord.value.wordIndex];
    const resultLineItems = <Array<HTMLDivElement>>Array.from(currentResultLine.children);
    const { textExample } = currentWord.value.word;

    const checkedItems = resultLineItems.reduce((acc: string[], elem) => {
        const isShow = elem.getAttribute('show') === 'true';

        if (isShow) acc.push(elem.innerHTML);

        return acc;
    }, []);
    const currentValue = checkedItems.join(' ');

    if (checkedItems.length === resultLineItems.length) {
        canCheck.publish(checkedItems.length === resultLineItems.length);
    }

    if (currentValue === textExample) {
        resultLineItems.forEach(elem => {
            elem.onclick = null;
            setColorBackground(elem, 'good');
        });
        canContinue.publish(currentValue === textExample);
    }
};
