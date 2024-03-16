import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import createElement from '@utils/create-element';
import { canCheck, currentWord } from '@shared/observables';
import { Round, Word } from '@interfaces/word-collection';
import style from './buttons-block.module.scss';
import { setColorBackground } from '../utils/set-color-background';

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
        const { checkBtn } = this.elements;
        checkBtn.onclick = () => {
            const {
                word: { textExample },
                wordIndex,
            } = this.currentWord;

            const currentResultLineElements = Array.from(
                [...this.resultBlock.children][wordIndex].children,
            ) as HTMLDivElement[];
            const wordArr = textExample.split(' ');
            const currentWordArr = currentResultLineElements.map(({ textContent }) => textContent);

            currentWordArr.forEach((word, i) => {
                const truthWord = wordArr[i];

                if (word === truthWord) {
                    setColorBackground(currentResultLineElements[i], 'good');
                } else {
                    setColorBackground(currentResultLineElements[i], 'warn');
                }
            });
        };
    }

    childrenElements() {
        return {
            checkBtn: createElement({ tag: 'button', text: 'Check' }),
        };
    }

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }

    checkSentenceSubscribe = (boolean: boolean): void => {
        this.elements.checkBtn.disabled = !boolean;
    };

    currentWordSubscribe = (word: { word: Word; wordIndex: number }): void => {
        this.currentWord = word;
        this.render();
    };

    connectedCallback(): void {
        currentWord.subscribe(this.currentWordSubscribe);
        canCheck.subscribe(this.checkSentenceSubscribe);
    }

    disconnectedCallback(): void {
        currentWord.unsubscribe(this.currentWordSubscribe);
        canCheck.unsubscribe(this.checkSentenceSubscribe);
    }
}

export default ButtonsBlock;
