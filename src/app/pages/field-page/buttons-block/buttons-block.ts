import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import createElement from '@utils/create-element';
import {
    autofillBtnDisabled$,
    canCheck$,
    canContinue$,
    correctIncorrectSentence$,
    currentWord$,
    pronounceBtnHidden$,
    resultBtnDisabled$,
    sourceBlockElements$,
} from '@shared/observables';
import { soundService } from '@shared/sound-service/sound-service';
import { popup } from '@shared/popup/popup';
import { CurrentLevelWord } from '@interfaces/current-word.interface';
import style from './buttons-block.module.scss';
import { setColorBackground } from '../utils/set-color-background';
import { ButtonName } from './buttons-name.enum';
import { showHideElements } from '../utils/show-hide-elements';
import { hasNextWord } from '../utils/has-next-word';
import WinMessage from '../win-message/win-message';
import { continueGame } from '../utils/continue-game';
import { setFieldBackground } from '../field/utils/set-field-background';
import { redirectTo } from '../../../../router/utils/redirect';
import { Routes } from '../../../../router/routes.enum';
import { getResultLineElements } from '../utils/get-result-line-elems';

@CustomSelector('Buttons-block')
class ButtonsBlock extends Component {
    protected elements = this.childrenElements();

    private currentWord!: CurrentLevelWord;

    constructor() {
        super(style);
    }

    createComponent(): void {
        const { pronounceBtn, result } = this.elements;

        this.appendElements();

        this.addEventToCheckContinueBtn();
        this.addEventToAutoFillBtn();
        this.addEventPronounceBtn();

        canContinue$.publish(false);
        canCheck$.publish(false);
        resultBtnDisabled$.publish(true);

        result.onclick = () => redirectTo(Routes.statistics);

        pronounceBtn.hidden = !pronounceBtnHidden$.value;
    }

    addEventPronounceBtn(): void {
        const { pronounceBtn } = this.elements;

        pronounceBtn.onclick = () => {
            if (!autofillBtnDisabled$.value) return;

            soundService.currentWord({
                sideEffectStart: () => pronounceBtn.classList.add(style.active),
                sideEffectEnd: () => pronounceBtn.classList.remove(style.active),
            });
        };
    }

    addEventToAutoFillBtn(): void {
        const { word } = this.currentWord;
        const { autofillBtn } = this.elements;
        const wordArr = word.textExample.split(' ');

        autofillBtn.onclick = () => {
            const currentResultLineElements = getResultLineElements();

            if (currentResultLineElements) {
                currentResultLineElements.forEach((elem, i) => {
                    this.setWordMissStatus(elem, wordArr[i]);
                });

                setFieldBackground();

                const incorrectSentence = Array.from(new Set([...correctIncorrectSentence$.value.incorrect, word]));

                correctIncorrectSentence$.publish({
                    correct: correctIncorrectSentence$.value.correct,
                    incorrect: incorrectSentence,
                });
            }

            canCheck$.publish(true);
            canContinue$.publish(true);

            sourceBlockElements$.value?.forEach(elem => {
                showHideElements(elem);
                elem.onclick = null;
            });

            if (!hasNextWord()) {
                popup.run(new WinMessage().getElement());
            }
        };
    }

    setWordMissStatus(elem: HTMLDivElement, wordText: string): void {
        setColorBackground(elem, 'miss');
        elem.style.opacity = '1';
        elem.innerText = wordText;
        elem.onclick = null;
    }

    addEventToCheckContinueBtn(): void {
        const { word } = this.currentWord;
        const { checkContinueBtn } = this.elements;

        checkContinueBtn.onclick = () => {
            const currentResultLineElements = getResultLineElements();
            if (!currentResultLineElements) return;

            if (canContinue$.value) {
                setFieldBackground();
                continueGame();
            }

            if (canCheck$.value) {
                const wordArr = word.textExample.split(' ');
                const currentWordArr = currentResultLineElements.map(({ textContent }) => textContent);

                currentWordArr.forEach((word, i) => {
                    const truthWord = wordArr[i];

                    if (word === truthWord) {
                        setColorBackground(currentResultLineElements[i], 'good');
                    } else {
                        setColorBackground(currentResultLineElements[i], 'warn');
                    }
                });
            }
        };
    }

    continueGameSubscribe = (boolean: boolean): void => {
        const { checkContinueBtn } = this.elements;

        if (boolean && checkContinueBtn.innerHTML === ButtonName.check) {
            checkContinueBtn.innerHTML = ButtonName.continue;
            checkContinueBtn.disabled = false;
        }
    };

    checkSentenceSubscribe = (boolean: boolean): void => {
        const { checkContinueBtn } = this.elements;
        checkContinueBtn.disabled = !boolean;
    };

    currentWordSubscribe = (word: CurrentLevelWord): void => {
        this.currentWord = word;
        this.render();
    };

    childrenElements() {
        return {
            autofillBtn: createElement({ tag: 'button', text: ButtonName.autofill }),
            pronounceBtn: createElement({ tag: 'button', text: ButtonName.pronounce }),
            result: createElement({ tag: 'button', text: ButtonName.result }),
            checkContinueBtn: createElement({ tag: 'button', text: ButtonName.check }),
        };
    }

    pronounceBtnHideSubscribe = (boolean: boolean): void => {
        this.elements.pronounceBtn.hidden = !boolean;
    };

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }

    autofillBtnDisabledSubscribe = (boolean: boolean): void => {
        const { autofillBtn } = this.elements;
        autofillBtn.disabled = boolean;
    };

    resultBtnDisabledSubscribe = (boolean: boolean): void => {
        const { result } = this.elements;
        result.disabled = boolean;
    };

    connectedCallback(): void {
        currentWord$.subscribe(this.currentWordSubscribe);
        canCheck$.subscribe(this.checkSentenceSubscribe);
        canContinue$.subscribe(this.continueGameSubscribe);
        pronounceBtnHidden$.subscribe(this.pronounceBtnHideSubscribe);
        autofillBtnDisabled$.subscribe(this.autofillBtnDisabledSubscribe);
        resultBtnDisabled$.subscribe(this.resultBtnDisabledSubscribe);
    }

    disconnectedCallback(): void {
        currentWord$.unsubscribe(this.currentWordSubscribe);
        canCheck$.unsubscribe(this.checkSentenceSubscribe);
        canContinue$.unsubscribe(this.continueGameSubscribe);
        pronounceBtnHidden$.unsubscribe(this.pronounceBtnHideSubscribe);
        autofillBtnDisabled$.unsubscribe(this.autofillBtnDisabledSubscribe);
        resultBtnDisabled$.unsubscribe(this.resultBtnDisabledSubscribe);
    }
}

export default ButtonsBlock;
