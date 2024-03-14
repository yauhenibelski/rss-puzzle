import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import style from './start-screen.module.scss';
import Notification from '../../shared/notification/notification';
import localStorage from '../../shared/local-storage/local-storage';

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

        if (localStorage.checkStorage()) {
            const { firstName, surname } = localStorage.getUserName();
            this.contentWrap.append(
                new Notification(
                    `Hello ${firstName} ${surname} !`,
                    style.notification,
                ).getElement(),
            );
        }
    }
}

export default StartPage;
