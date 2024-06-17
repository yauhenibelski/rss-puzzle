import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import createElement from '@utils/create-element';
import { currentLevel$, currentWord$, playField$, sourceBlockElements$ } from '@shared/observables';
import { CurrentLevelWord } from '@interfaces/current-word.interface';
import style from './source-block.module.scss';
import { showHideElements } from '../utils/show-hide-elements';
import { shiftElementsLeftByOpacity } from '../utils/shift-elements-left';
import { setColorBackground } from '../utils/set-color-background';
import { checkSentence } from '../utils/check-sentence';
import { SourceBlockElements } from './source-block-elements.interface';

@CustomSelector('Source-block')
class SourceBlock extends Component {
    private currentWord!: CurrentLevelWord;
    constructor() {
        super(style);
    }

    createComponent(): void {
        const resultBlock = playField$.value;

        if (resultBlock) {
            const textExample = this.currentWord.word.textExample.split(' ');
            const currentResultLine = <HTMLDivElement>[...resultBlock.children][this.currentWord.wordIndex];
            const wordElements = this.getSourceBlockElements(textExample);

            currentResultLine.innerHTML = '';
            currentResultLine.append(...wordElements.resultLineElements);

            this.contentWrap.append(...wordElements.sourceElements);

            sourceBlockElements$.publish(wordElements.sourceElements);
        }
    }

    getSourceBlockElements(textExample: string[]): SourceBlockElements {
        const sourceElements: HTMLDivElement[] = [];
        const resultLineElements: HTMLDivElement[] = [];

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

            resultLineElements.push(wordElemClone);
            sourceElements.push(wordElem);
        });

        return {
            sourceElements,
            resultLineElements,
        };
    }

    toggleViewWord({ target }: MouseEvent, elem: HTMLDivElement): void {
        const resultBlock = playField$.value;

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

    currentWordSubscribe = (word: CurrentLevelWord): void => {
        this.currentWord = word;
        this.render();
    };

    currentLevelSubscribe = (): void => {
        this.currentWord = currentWord$.value;
        this.render();
    };

    connectedCallback(): void {
        currentWord$.subscribe(this.currentWordSubscribe);
        currentLevel$.subscribe(this.currentLevelSubscribe);
    }

    disconnectedCallback(): void {
        currentWord$.unsubscribe(this.currentWordSubscribe);
        currentLevel$.unsubscribe(this.currentLevelSubscribe);
    }
}

export default SourceBlock;
