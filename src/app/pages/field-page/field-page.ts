import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import style from './field-page.module.scss';
import PlayField from './field/field';

@CustomSelector('Field-page')
class FieldPage extends Component {
    protected elements = this.childrenElements();

    constructor() {
        super(style);
        this.createComponent();
    }

    createComponent(): void {
        this.appendElements();
    }

    childrenElements() {
        return {
            playField: new PlayField().getElement(),
        };
    }

    appendElements(): void {
        const { playField } = this.elements;
        this.contentWrap.append(playField);
    }
}

export default FieldPage;
