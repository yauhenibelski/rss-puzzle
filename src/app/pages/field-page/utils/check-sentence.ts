import { canCheck, canContinue, playField as playField$, currentWord } from '@shared/observables';
import { popup } from '@shared/popup/popup';
import { setColorBackground } from './set-color-background';
import { hasNextWord } from './has-next-word';
import WinMessage from '../win-message/win-message';

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
    const allWordsChecked: boolean = checkedItems.length === resultLineItems.length;
    const rightSentence: boolean = currentValue === textExample;

    canCheck.publish(allWordsChecked);

    if (rightSentence) {
        resultLineItems.forEach(elem => {
            elem.onclick = null;
            setColorBackground(elem, 'good');
        });
        canContinue.publish(rightSentence);
    }

    if (rightSentence && allWordsChecked && !hasNextWord()) {
        popup.run(new WinMessage().getElement());
    }
};
