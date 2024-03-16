import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import { wordCollection } from '@shared/wordCollection';
import createElement from '@utils/create-element';
import { currentLevel, currentWord } from '@shared/observables';
import { CurrentLevelRound } from '@interfaces/current-level';
import { Round, Word } from '@interfaces/word-collection';
import { shiftElementsLeftByOpacity } from '../utils/shift-elements-left';
import { showHideElements } from '../utils/show-hide-elements';
import style from './field.module.scss';

@CustomSelector('play-field')
class PlayField extends Component {
    protected elements = this.childrenElements();
    private currentWord!: { word: Word; wordIndex: number };
    private currentRound!: Round;

    constructor() {
        super(style);
    }

    createComponent(): void {
        console.log(this.currentRound, 'currentRound');
        this.appendElements();
    }

    toggleViewWord({ target }: MouseEvent, elem: HTMLDivElement) {
        const { resultBlock } = this.elements;
        const currentResultLine = <HTMLDivElement>(
            [...resultBlock.childNodes][this.currentWord.wordIndex]
        );

        showHideElements(<HTMLDivElement>target, elem);
        (<HTMLDivElement>target).onclick = null;

        elem.onclick = event => this.toggleViewWord(event, <HTMLDivElement>target);

        shiftElementsLeftByOpacity(currentResultLine);

        this.checkSentence();
    }

    createSourceDataBlock() {
        // console.log(this.currentWord.word.textExample)
        const { sourceDataBlock } = this.elements;
        const textExample = this.currentWord.word.textExample.split(' ');
        const currentResultLine = <HTMLDivElement>(
            [...this.elements.resultBlock.childNodes][this.currentWord.wordIndex]
        );
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
            sourceDataBlock.append(wordElem);
        });
    }

    currentRoundSubscribe = ({ level, round }: CurrentLevelRound): void => {
        this.currentRound = wordCollection[level].rounds[round];
        this.render();
    };

    currentWordSubscribe = (word: { word: Word; wordIndex: number }): void => {
        this.currentWord = word;
        const { sourceDataBlock } = this.elements;
        sourceDataBlock.innerHTML = '';
        this.createSourceDataBlock();
    };

    connectedCallback(): void {
        currentLevel.subscribe(this.currentRoundSubscribe);
        currentWord.subscribe(this.currentWordSubscribe);
    }

    disconnectedCallback(): void {
        currentLevel.unsubscribe(this.currentRoundSubscribe);
        currentWord.unsubscribe(this.currentWordSubscribe);
    }

    childrenElements() {
        return {
            resultBlock: createElement({ tag: 'div', style: style['result-block'] }),
            sourceDataBlock: createElement({ tag: 'div', style: style['source-data-block'] }),
        };
    }

    addResultLines(): void {
        const { resultBlock } = this.elements;
        const resultLines = Array.from({ length: this.currentRound.words.length }, () => {
            return createElement({ tag: 'div', style: style['result-line'] });
        });

        resultBlock.append(...resultLines);
    }

    checkSentence(): void {
        const currentResultLine = <HTMLDivElement>(
            [...this.elements.resultBlock.childNodes][this.currentWord.wordIndex]
        );
        const resultLineItems = <Array<HTMLElement>>Array.from(currentResultLine.children);
        const { textExample } = this.currentWord.word;

        const currentValue = resultLineItems
            .reduce((acc: string[], elem) => {
                if (Number(elem.style.opacity)) {
                    acc.push(elem.innerHTML);
                }

                return acc;
            }, [])
            .join(' ');

        console.log(currentValue === textExample);

        if (currentValue === textExample) {
            resultLineItems.forEach(elem => {
                elem.onclick = null;
            });
        }
    }

    appendElements(): void {
        const { resultBlock, sourceDataBlock } = this.elements;
        this.contentWrap.append(resultBlock, sourceDataBlock);
        this.addResultLines();
    }
}
export default PlayField;
