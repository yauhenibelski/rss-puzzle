import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import style from './start-screen.module.scss';
import Notification from '../../shared/notification/notification';
import localStorage from '../../shared/local-storage/local-storage';
import { redirectTo } from '../../../router/utils/redirect';
import { Routes } from '../../../router/routes.enum';

@CustomSelector('Start-page')
class StartPage extends Component {
    elements = this.childrenElements();

    constructor() {
        super(style);
    }

    createComponent(): void {
        const { startBtn } = this.elements;
        this.appendElements();

        startBtn.onclick = () => redirectTo(Routes.field);
    }

    connectedCallback(): void {
        this.render();
    }

    childrenElements() {
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
                new Notification(`Hello ${firstName} ${surname} !`, style.notification).getElement(),
            );
        }
    }
}

export default StartPage;
