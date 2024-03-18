import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import { currentLevel, pronounceBtnHidden } from '@shared/observables';
import localStorage from '@shared/local-storage/local-storage';
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
        currentLevel.publish(localStorage.getNextRound());
        pronounceBtnHidden.publish(localStorage.getHintState().mute);
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

    currentLevelSubscribe = () => {
        this.render();
    };

    connectedCallback(): void {
        currentLevel.subscribe(this.currentLevelSubscribe);
    }

    disconnectedCallback(): void {
        currentLevel.unsubscribe(this.currentLevelSubscribe);
    }

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default FieldPage;
