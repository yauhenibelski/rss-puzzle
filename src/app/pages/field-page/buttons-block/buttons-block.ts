import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import createElement from '@utils/create-element';
import { canCheck, canContinue, currentWord } from '@shared/observables';
import { Round, Word } from '@interfaces/word-collection';
import { getCurrentWordByIndex } from '@shared/utils/get-current-word';
import style from './buttons-block.module.scss';
import { setColorBackground } from '../utils/set-color-background';
import { ButtonName } from './buttons-name.enum';

@CustomSelector('Buttons-block')
class ButtonsBlock extends Component {
    protected elements = this.childrenElements();
    private currentWord!: { word: Word; wordIndex: number };
    private currentRound!: Round;
    constructor(private resultBlock: HTMLDivElement) {
        super(style);
    }

    createComponent(): void {
        this.appendElements();
        this.addEventsToCheckContinueBtn();
        canContinue.publish(false);
        canCheck.publish(false);
    }

    addEventsToCheckContinueBtn(): void {
        const { wordIndex, word } = this.currentWord;
        const { checkContinueBtn } = this.elements;

        checkContinueBtn.onclick = () => {
            if (canContinue.value) {
                currentWord.publish(getCurrentWordByIndex(wordIndex + 1));
            } else {
                const currentResultLineElements = Array.from(
                    [...this.resultBlock.children][wordIndex].children,
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
        };
    }

    continueGameSubscribe = (boolean: boolean): void => {
        const { checkContinueBtn } = this.elements;

        if (boolean && checkContinueBtn.innerHTML === ButtonName.check) {
            checkContinueBtn.innerHTML = ButtonName.continue;
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
            checkContinueBtn: createElement({ tag: 'button', text: ButtonName.check }),
        };
    }

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }

    connectedCallback(): void {
        currentWord.subscribe(this.currentWordSubscribe);
        canCheck.subscribe(this.checkSentenceSubscribe);
        canContinue.subscribe(this.continueGameSubscribe);
    }

    disconnectedCallback(): void {
        currentWord.unsubscribe(this.currentWordSubscribe);
        canCheck.unsubscribe(this.checkSentenceSubscribe);
        canContinue.unsubscribe(this.continueGameSubscribe);
    }
}

export default ButtonsBlock;
