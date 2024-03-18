import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import CustomSelector from '@utils/set-selector-name';
import { popup } from '@shared/popup/popup';
import { autofillBtnDisabled, currentLevel, fieldHintText, playField } from '@shared/observables';
import { wordCollection } from '@shared/wordCollection';
import { continueGame } from '../utils/continue-game';
import { showHideElements } from '../utils/show-hide-elements';
import { setFieldBackground } from '../field/utils/set-field-background';
import style from './win-message.module.scss';

@CustomSelector('Win-message')
class WinMessage extends Component {
    protected elements = this.childrenElements();
    constructor() {
        super(style);
        this.createComponent();
    }

    createComponent(): void {
        const { continueBtn, openImgBtn } = this.elements;
        const { level, round } = currentLevel.value;
        const roadProps = wordCollection[level].rounds[round].levelData;
        const { imageSrc, name, year, author } = roadProps;

        this.appendElements();

        openImgBtn.onclick = () => {
            const allFieldItems = [...playField.value!.children].flatMap(fieldLine => {
                return [...fieldLine.children] as HTMLDivElement[];
            });

            allFieldItems.forEach(elem => {
                showHideElements(elem);
            });

            fieldHintText.publish(`${name} ${author}, ${year}`);
            autofillBtnDisabled.publish(true);

            setFieldBackground(imageSrc);
            popup.remove();
        };

        continueBtn.onclick = () => {
            continueGame();
            popup.remove();
        };
    }

    childrenElements() {
        return {
            btnWrap: createElement({ tag: 'div', style: style['btn-wrap'] }),
            winMessage: createElement({ tag: 'h2', text: 'Good !' }),
            openImgBtn: createElement({ tag: 'button', text: 'Show picture' }),
            continueBtn: createElement({ tag: 'button', text: 'Continue' }),
        };
    }

    appendElements(): void {
        const { btnWrap, winMessage, openImgBtn, continueBtn } = this.elements;

        btnWrap.append(openImgBtn, continueBtn);

        this.contentWrap.append(winMessage, btnWrap);
    }
}

export default WinMessage;