import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import createElement from '@utils/create-element';
import { pronounceBtnHidden } from '@shared/observables';
import style from './toggle-options-block.module.scss';

@CustomSelector('Toggle-hint-block')
class ToggleOptionsBlock extends Component {
    protected elements = this.childrenElements();
    constructor() {
        super(style);

        this.createComponent();
    }

    createComponent(): void {
        const { muteBtn } = this.elements;

        muteBtn.onclick = () => {
            muteBtn.classList.toggle(style['mute-btn-off']);
            pronounceBtnHidden.publish(!pronounceBtnHidden.value);
        };

        this.appendElements();
    }

    childrenElements() {
        return {
            btnsContainer: createElement({ tag: 'div', style: style['btns-container'] }),
            optionsContainer: createElement({ tag: 'div', style: style['options-container'] }),
            muteBtn: createElement({ tag: 'button', style: style['mute-btn-on'] }),
        };
    }

    appendElements(): void {
        const { btnsContainer, optionsContainer, muteBtn } = this.elements;

        btnsContainer.append(muteBtn);

        this.contentWrap.append(optionsContainer, btnsContainer);
    }
}

export default ToggleOptionsBlock;
