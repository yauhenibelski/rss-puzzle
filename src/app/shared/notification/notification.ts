import CustomSelector from '@utils/set-selector-name';
import Component from '@utils/ui-component-template';
import createElement from '@utils/create-element';
import style from './notification.module.scss';

@CustomSelector('notification')
class Notification extends Component {
    elements: { [key: string]: HTMLElement } = this.childrenElements();

    constructor(
        protected content: string,
        hostStyle: string,
    ) {
        super(style);

        this.classList.add(hostStyle);
        this.createComponent();
    }

    createComponent(): void {
        this.appendElements();
    }

    childrenElements(): { [key: string]: HTMLElement } {
        return {
            noticeText: createElement({ tag: 'p', text: this.content }),
        };
    }

    appendElements(): void {
        const { noticeText } = this.elements;
        this.contentWrap.append(noticeText);
    }
}

export default Notification;
