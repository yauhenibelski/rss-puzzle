import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import { wordCollection } from '@shared/wordCollection';
import createElement from '@utils/create-element';
import { currentLevel, currentWord, playField, fieldHintText as fieldHintText$ } from '@shared/observables';
import { CurrentLevelRound } from '@interfaces/current-level.interface';
import { Round, Word } from '@interfaces/word-collection.interface';
import style from './field.module.scss';
import { translationHintText } from './translation-hint-text';

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
            word: { textExampleTranslate },
        } = this.currentWord;

        this.showHint = !this.showHint;

        if (!this.showHint) {
            fieldHintText$.publish(textExampleTranslate);
            return;
        }

        fieldHintText$.publish(translationHintText);
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

    fieldHintTextSubscribe = (text: string) => {
        const {
            translationHint: { firstElementChild },
        } = this.elements;
        firstElementChild!.innerHTML = text;
    };

    connectedCallback(): void {
        currentLevel.subscribe(this.currentRoundSubscribe);
        currentWord.subscribe(this.currentWordSubscribe);
        fieldHintText$.subscribe(this.fieldHintTextSubscribe);
    }

    disconnectedCallback(): void {
        currentLevel.unsubscribe(this.currentRoundSubscribe);
        currentWord.unsubscribe(this.currentWordSubscribe);
        fieldHintText$.unsubscribe(this.fieldHintTextSubscribe);
    }

    childrenElements() {
        return {
            resultBlock: createElement({ tag: 'div', style: style['result-block'] }),
            translationHint: createElement({ tag: 'p', style: style['translation-hint'] }, true),
        };
    }

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
        this.addResultLines();
    }
}
export default PlayField;
