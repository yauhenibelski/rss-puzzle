import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import createElement from '@utils/create-element';
import { currentLevel, pronounceBtnHidden } from '@shared/observables';
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
        const { muteBtn } = this.elements;

        this.appendElements();
        this.createLevelOptions();
        this.createRoundOptions();

        muteBtn.onclick = () => {
            if (pronounceBtnHidden.value) {
                muteBtn.className = style['mute-btn-off'];
            } else {
                muteBtn.className = style['mute-btn-on'];
            }

            localStorage.saveHintState({ mute: !pronounceBtnHidden.value });
            pronounceBtnHidden.publish(!pronounceBtnHidden.value);
        };
    }

    createLevelOptions(): void {
        const { levelOptions } = this.elements;
        const { level } = currentLevel.value;

        wordCollection.forEach((_, i) => {
            const option = createElement({ tag: 'option', text: `Level ${i + 1}` });

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

    createRoundOptions(): void {
        const { roundOptions } = this.elements;
        const { level, round } = currentLevel.value;

        wordCollection[level].rounds.forEach((_, i) => {
            const option = createElement({ tag: 'option', text: `Round ${i + 1} ` });

            if (round === i) {
                option.selected = true;
            }

            roundOptions.append(option);
        });

        roundOptions.onchange = (event): void => {
            const { selectedIndex } = event.target as HTMLSelectElement;
            const { level } = currentLevel.value;

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
        currentLevel.subscribe(this.currentLevelSubscribe);
    }

    disconnectedCallback(): void {
        currentLevel.unsubscribe(this.currentLevelSubscribe);
    }

    childrenElements() {
        return {
            btnsContainer: createElement({ tag: 'div', style: style['btns-container'] }),
            optionsContainer: createElement({ tag: 'form', style: style['options-container'] }),
            muteBtn: createElement({
                tag: 'button',
                style: pronounceBtnHidden.value ? style['mute-btn-on'] : style['mute-btn-off'],
            }),
            levelOptions: createElement({ tag: 'select' }),
            roundOptions: createElement({ tag: 'select' }),
        };
    }

    appendElements(): void {
        const { btnsContainer, optionsContainer, muteBtn, levelOptions, roundOptions } = this.elements;

        btnsContainer.append(muteBtn);
        optionsContainer.append(levelOptions, roundOptions);

        this.contentWrap.append(optionsContainer, btnsContainer);
    }
}

export default ToggleOptionsBlock;
