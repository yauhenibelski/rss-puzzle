import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import createElement from '@utils/create-element';
import { currentLevel$, pronounceBtnHidden$ } from '@shared/observables';
import { wordCollection } from '@shared/wordCollection';
import localStorage from '@shared/local-storage/local-storage';
import style from './toggle-options-block.module.scss';
import { setRoundOrLevel } from '../utils/change-round-or-level';

@CustomSelector('Toggle-hint-block')
class ToggleOptionsBlock extends Component {
    protected elements = this.childrenElements();
    constructor() {
        super(style);
    }

    createComponent(): void {
        const { muteBtn, logOutBtn } = this.elements;
        const completed = localStorage.getCompleted();

        this.appendElements();
        this.createLevelOptions(completed);
        this.createRoundOptions(completed);

        muteBtn.onclick = () => {
            if (pronounceBtnHidden$.value) {
                muteBtn.className = style['mute-btn-off'];
            } else {
                muteBtn.className = style['mute-btn-on'];
            }

            localStorage.saveHintState({ mute: !pronounceBtnHidden$.value });
            pronounceBtnHidden$.publish(!pronounceBtnHidden$.value);
        };

        logOutBtn.onclick = () => {
            localStorage.storage.clear();
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        };
    }

    createLevelOptions(completed: Array<number[]>): void {
        const { levelOptions } = this.elements;
        const { level } = currentLevel$.value;
        const statusText = completed[level].length === wordCollection[level].roundsCount ? 'done' : 'x';

        wordCollection.forEach((_, i) => {
            const option = createElement({ tag: 'option', text: `Level ${i + 1} -- ${statusText}` });

            if (level === i) {
                option.selected = true;
            }

            levelOptions.append(option);
        });

        levelOptions.onchange = event => {
            const { selectedIndex } = event.target as HTMLSelectElement;
            setRoundOrLevel({
                level: selectedIndex,
                round: 0,
            });
        };
    }

    createRoundOptions(completed: Array<number[]>): void {
        const { roundOptions } = this.elements;
        const { level, round } = currentLevel$.value;

        wordCollection[level].rounds.forEach((_, i) => {
            const statusText = completed[level].includes(i) ? 'done' : 'x';

            const option = createElement({ tag: 'option', text: `Round ${i + 1} -- ${statusText}` });

            if (round === i) {
                option.selected = true;
            }

            roundOptions.append(option);
        });

        roundOptions.onchange = (event): void => {
            const { selectedIndex } = event.target as HTMLSelectElement;
            const { level } = currentLevel$.value;

            setRoundOrLevel({
                level,
                round: selectedIndex,
            });
        };
    }

    currentLevelSubscribe = (): void => {
        this.render();
    };

    connectedCallback(): void {
        currentLevel$.subscribe(this.currentLevelSubscribe);
    }

    disconnectedCallback(): void {
        currentLevel$.unsubscribe(this.currentLevelSubscribe);
    }

    childrenElements() {
        return {
            btnsContainer: createElement({ tag: 'div' }),
            optionsContainer: createElement({ tag: 'form', style: style['options-container'] }),
            muteBtn: createElement({
                tag: 'button',
                style: pronounceBtnHidden$.value ? style['mute-btn-on'] : style['mute-btn-off'],
            }),
            levelOptions: createElement({ tag: 'select' }),
            roundOptions: createElement({ tag: 'select' }),
            logOutBtn: createElement({ tag: 'button', style: style['log-out-btn'] }),
        };
    }

    appendElements(): void {
        const { btnsContainer, optionsContainer, muteBtn, levelOptions, roundOptions, logOutBtn } = this.elements;

        btnsContainer.append(muteBtn, logOutBtn);
        optionsContainer.append(levelOptions, roundOptions);

        this.contentWrap.append(optionsContainer, btnsContainer);
    }
}

export default ToggleOptionsBlock;
