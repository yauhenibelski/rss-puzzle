import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import createElement from '@utils/create-element';
import { correctIncorrectSentence, currentLevel } from '@shared/observables';
import { soundService } from '@shared/sound-service/sound-service';
import { wordCollection } from '@shared/wordCollection';
import { PATH } from '@shared/path';
import { setNextLevelOrRound } from '@pages/field-page/utils/set-next-level-or-round';
import style from './statistics.module.scss';
import { Routes } from '../../../router/routes.enum';
import { redirectTo } from '../../../router/utils/redirect';

@CustomSelector('Statistics-page')
class StatisticsPage extends Component {
    protected elements = this.childrenElements();
    constructor() {
        super(style);
    }

    createComponent(): void {
        const { imgContainer, continueBtn } = this.elements;
        const { level, round } = currentLevel.value;
        const { levelData } = wordCollection[level].rounds[round];
        const img = imgContainer.firstElementChild as HTMLImageElement;

        img.src = `${PATH}/images/${levelData.imageSrc}`;
        const pictureDescription = createElement({
            tag: 'p',
            text: `${levelData.author} (${levelData.year}) ${levelData.name}`,
        });

        imgContainer.append(pictureDescription);

        this.createCorrectSentence();
        this.createInCorrectSentence();

        continueBtn.onclick = () => {
            setNextLevelOrRound();
            redirectTo(Routes.field);
        };

        this.appendElements();
    }

    connectedCallback(): void {
        this.render();
    }

    createCorrectSentence() {
        const { correctSentence } = this.elements;
        const { correct } = correctIncorrectSentence.value;

        correct.forEach(({ audioExample, textExample }) => {
            const wordElem = createElement({ tag: 'p', style: style.sentence }, true);
            const soundBtn = createElement({ tag: 'button' });
            const { lastElementChild } = wordElem;

            lastElementChild!.innerHTML = textExample;
            wordElem.prepend(soundBtn);

            soundBtn.onclick = () => {
                soundService.play(audioExample);
            };

            correctSentence.append(wordElem);
        });
    }

    createInCorrectSentence() {
        const { incorrectSentence } = this.elements;
        const { incorrect } = correctIncorrectSentence.value;

        incorrect.forEach(({ audioExample, textExample }) => {
            const wordElem = createElement({ tag: 'p', style: style.sentence }, true);
            const soundBtn = createElement({ tag: 'button' });
            const { lastElementChild } = wordElem;

            lastElementChild!.innerHTML = textExample;
            wordElem.prepend(soundBtn);

            soundBtn.onclick = () => {
                soundService.play(audioExample);
            };

            incorrectSentence.append(wordElem);
        });
    }

    childrenElements() {
        return {
            imgContainer: createElement({ tag: 'img', style: style['img-wrap'] }, true),
            correctSentence: createElement({ tag: 'div', style: style['correct-sentence-wrap'] }),
            incorrectSentence: createElement({ tag: 'div', style: style['incorrect-sentence-wrap'] }),
            continueBtn: createElement({ tag: 'button', text: 'Continue', style: style['continue-btn'] }),
        };
    }

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default StatisticsPage;
