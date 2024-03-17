import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import style from './field-page.module.scss';
import PlayField from './field/field';
import SourceBlock from './source-block/source-block';
import ButtonsBlock from './buttons-block/buttons-block';
import ToggleHintBlock from './toggle-options-block/toggle-options-block';

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
            toggleOptionsBlock: new ToggleHintBlock().getElement(),
            playField: new PlayField().getElement(),
            sourceBlock: new SourceBlock().getElement(),
            buttonBlock: new ButtonsBlock().getElement(),
        };
    }

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default FieldPage;
