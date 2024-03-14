import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import style from './start-screen.module.scss';

@CustomSelector('Start-page')
class StartPage extends Component {
    elements: { [key: string]: HTMLElement } = this.childrenElements();

    constructor() {
        super(style);
        this.createComponent();
    }

    createComponent(): void {
        this.appendElements();
    }

    childrenElements(): { [key: string]: HTMLElement } {
        return {
            headLine: createElement({ tag: 'h1', text: 'ENGLISH PUZZLE' }),
            instructionText: createElement({ tag: 'p', text: 'Click on words, collect phrases.' }),
            noticeText: createElement({
                tag: 'p',
                text: 'Words can be drag and drop. Select tooltips in the menu.',
            }),
            startBtn: createElement({ tag: 'button', text: 'START' }),
        };
    }

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default StartPage;