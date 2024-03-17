import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import { Word } from '@interfaces/word-collection';
import createElement from '@utils/create-element';
import { currentWord, playField } from '@shared/observables';
import style from './source-block.module.scss';
import { showHideElements } from '../utils/show-hide-elements';
import { shiftElementsLeftByOpacity } from '../utils/shift-elements-left';
import { setColorBackground } from '../utils/set-color-background';
import { checkSentence } from '../utils/check-sentence';

@CustomSelector('Source-block')
class SourceBlock extends Component {
    private currentWord!: { word: Word; wordIndex: number };
    constructor() {
        super(style);
    }

    createComponent() {
        const resultBlock = playField.value;

        if (resultBlock) {
            const textExample = this.currentWord.word.textExample.split(' ');
            const currentResultLine = <HTMLDivElement>[...resultBlock.children][this.currentWord.wordIndex];
            currentResultLine.innerHTML = '';

            textExample.sort(() => Math.random() - 0.5);
            textExample.forEach(wordText => {
                const wordElem = createElement({ tag: 'div', style: style.word, text: wordText });
                const wordElemClone = createElement({
                    tag: 'div',
                    style: style['word-clone'],
                    text: wordText,
                });

                wordElem.setAttribute('show', 'true');
                wordElemClone.setAttribute('show', 'false');

                wordElem.onclick = event => this.toggleViewWord(event, wordElemClone);
                wordElemClone.onclick = event => this.toggleViewWord(event, wordElem);

                currentResultLine.append(wordElemClone);
                this.contentWrap.append(wordElem);
            });
        }
    }

    toggleViewWord({ target }: MouseEvent, elem: HTMLDivElement) {
        const resultBlock = playField.value;

        if (resultBlock) {
            const currentResultLine = <HTMLDivElement>[...resultBlock.children][this.currentWord.wordIndex];
            const targetElem = <HTMLDivElement>target;

            showHideElements(targetElem, elem, () => {
                shiftElementsLeftByOpacity(currentResultLine);
                shiftElementsLeftByOpacity(<HTMLDivElement>this.contentWrap);
                checkSentence();
            });

            targetElem.onclick = null;
            setColorBackground(targetElem, 'none');

            elem.onclick = event => this.toggleViewWord(event, targetElem);
        }
    }

    currentWordSubscribe = (word: { word: Word; wordIndex: number }): void => {
        this.currentWord = word;
        this.contentWrap.innerHTML = '';

        this.createComponent();
    };

    connectedCallback(): void {
        currentWord.subscribe(this.currentWordSubscribe);
    }

    disconnectedCallback(): void {
        currentWord.unsubscribe(this.currentWordSubscribe);
    }
}

export default SourceBlock;
