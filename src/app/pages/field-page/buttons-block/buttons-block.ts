import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import createElement from '@utils/create-element';
import {
    autofillBtnDisabled,
    canCheck,
    canContinue,
    currentWord,
    playField,
    pronounceBtnHidden,
    sourceBlockElements,
} from '@shared/observables';
import { Word } from '@interfaces/word-collection';
import { soundService } from '@shared/sound-service/sound-service';
import { popup } from '@shared/popup/popup';
import style from './buttons-block.module.scss';
import { setColorBackground } from '../utils/set-color-background';
import { ButtonName } from './buttons-name.enum';
import { showHideElements } from '../utils/show-hide-elements';
import { hasNextWord } from '../utils/has-next-word';
import WinMessage from '../win-message/win-message';
import { continueGame } from '../utils/continue-game';
import { setFieldBackground } from '../field/utils/set-field-background';

@CustomSelector('Buttons-block')
class ButtonsBlock extends Component {
    protected elements = this.childrenElements();

    private currentWord!: { word: Word; wordIndex: number };

    constructor() {
        super(style);
    }

    createComponent(): void {
        const { pronounceBtn } = this.elements;

        this.appendElements();

        this.addEventToCheckContinueBtn();
        this.addEventToAutoFillBtn();
        this.addEventPronounceBtn();

        canContinue.publish(false);
        canCheck.publish(false);

        pronounceBtn.hidden = pronounceBtnHidden.value;
    }

    addEventPronounceBtn(): void {
        const { pronounceBtn } = this.elements;

        pronounceBtn.onclick = () => {
            console.log(autofillBtnDisabled.value);
            if (!autofillBtnDisabled.value) {
                soundService.currentWord({
                    sideEffectStart: () => pronounceBtn.classList.add(style.active),
                    sideEffectEnd: () => pronounceBtn.classList.remove(style.active),
                });
            }
        };
    }

    addEventToAutoFillBtn(): void {
        const { wordIndex, word } = this.currentWord;
        const { autofillBtn } = this.elements;
        const wordArr = word.textExample.split(' ');

        autofillBtn.onclick = () => {
            const resultBlock = playField.value;

            if (resultBlock) {
                const currentResultLineElements = Array.from(
                    [...resultBlock.children][wordIndex].children,
                ) as HTMLDivElement[];

                currentResultLineElements.forEach((elem, i) => {
                    setColorBackground(elem, 'miss');
                    elem.style.opacity = '1';
                    elem.innerText = wordArr[i];
                    elem.onclick = null;
                });

                setFieldBackground();
            }

            canCheck.publish(true);
            canContinue.publish(true);

            sourceBlockElements.value?.forEach(elem => {
                showHideElements(elem);
                elem.onclick = null;
            });

            if (!hasNextWord()) {
                popup.run(new WinMessage().getElement());
            }
        };
    }

    addEventToCheckContinueBtn(): void {
        const { wordIndex, word } = this.currentWord;
        const { checkContinueBtn } = this.elements;

        checkContinueBtn.onclick = () => {
            const resultBlock = playField.value;

            if (resultBlock) {
                if (canContinue.value) {
                    setFieldBackground();
                    continueGame();
                }

                if (canCheck.value) {
                    const currentResultLineElements = Array.from(
                        [...resultBlock.children][wordIndex].children,
                    ) as HTMLDivElement[];

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

    currentWordSubscribe = (word: { word: Word; wordIndex: number }): void => {
        this.currentWord = word;
        this.render();
    };

    childrenElements() {
        return {
            autofillBtn: createElement({ tag: 'button', text: ButtonName.autofill }),
            pronounceBtn: createElement({ tag: 'button', text: ButtonName.pronounce }),
            checkContinueBtn: createElement({ tag: 'button', text: ButtonName.check }),
        };
    }

    pronounceBtnHideSubscribe = (boolean: boolean): void => {
        this.elements.pronounceBtn.hidden = boolean;
    };

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }

    autofillBtnDisabledSubscribe = (boolean: boolean): void => {
        const { autofillBtn } = this.elements;
        autofillBtn.disabled = boolean;
    };

    connectedCallback(): void {
        currentWord.subscribe(this.currentWordSubscribe);
        canCheck.subscribe(this.checkSentenceSubscribe);
        canContinue.subscribe(this.continueGameSubscribe);
        pronounceBtnHidden.subscribe(this.pronounceBtnHideSubscribe);
        autofillBtnDisabled.subscribe(this.autofillBtnDisabledSubscribe);
    }

    disconnectedCallback(): void {
        currentWord.unsubscribe(this.currentWordSubscribe);
        canCheck.unsubscribe(this.checkSentenceSubscribe);
        canContinue.unsubscribe(this.continueGameSubscribe);
        pronounceBtnHidden.unsubscribe(this.pronounceBtnHideSubscribe);
        autofillBtnDisabled.unsubscribe(this.autofillBtnDisabledSubscribe);
    }
}

export default ButtonsBlock;
