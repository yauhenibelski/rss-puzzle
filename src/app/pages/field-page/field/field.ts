import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import { wordCollection } from '@shared/wordCollection';
import createElement from '@utils/create-element';
import { currentLevel, currentWord, playField } from '@shared/observables';
import { CurrentLevelRound } from '@interfaces/current-level';
import { Round, Word } from '@interfaces/word-collection';
import style from './field.module.scss';

@CustomSelector('play-field')
class PlayField extends Component {
    protected elements = this.childrenElements();
    private currentWord!: { word: Word; wordIndex: number };
    private currentRound!: Round;
    private showHint = false;

    constructor() {
        super(style);
    }

    createComponent(): void {
        const { translationHint, resultBlock } = this.elements;
        translationHint.onclick = () => this.showHideTranslationHint();

        playField.publish(resultBlock);

        this.appendElements();
    }

    showHideTranslationHint(): void {
        const {
            translationHint: { firstElementChild },
        } = this.elements;
        const {
            word: { textExampleTranslate },
        } = this.currentWord;

        this.showHint = !this.showHint;

        if (!this.showHint) {
            firstElementChild!.innerHTML = textExampleTranslate;
            return;
        }

        firstElementChild!.innerHTML = 'Translation hint';
    }

    currentRoundSubscribe = ({ level, round }: CurrentLevelRound): void => {
        this.currentRound = wordCollection[level].rounds[round];
        this.render();
    };

    currentWordSubscribe = (word: { word: Word; wordIndex: number }): void => {
        this.currentWord = word;

        this.showHint = false;
        this.showHideTranslationHint();
    };

    addResultLines(): void {
        const { resultBlock } = this.elements;
        const resultLines = Array.from({ length: this.currentRound.words.length }, () => {
            return createElement({ tag: 'div', style: style['result-line'] });
        });

        resultBlock.append(...resultLines);
    }

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
            translationHint: createElement(
                { tag: 'p', style: style['translation-hint'], text: 'Translation hint' },
                true,
            ),
        };
    }

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
        this.addResultLines();
    }
}
export default PlayField;
