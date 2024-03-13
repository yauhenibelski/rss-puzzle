import Component from '@utils/ui-component-template';
import CustomSelector from '@utils/set-selector-name';
import createElement from '@utils/create-element';
import style from './login-page.module.scss';

@CustomSelector('Login-page')
class LoginPage extends Component {
    elements: { [key: string]: HTMLElement } = this.childrenElements();

    constructor() {
        super(style);
        this.createComponent();
    }

    createComponent(): void {
        this.appendElements();

        const firstNameField = <HTMLInputElement>this.elements.firstNameField.firstChild;
        const secondNameField = <HTMLInputElement>this.elements.secondNameField.firstChild;
        const { loginBTN } = this.elements;

        firstNameField.required = true;
        firstNameField.placeholder = 'example: John';

        secondNameField.required = true;
        secondNameField.placeholder = 'example: Smith';

        loginBTN.onclick = () => {
            console.log('login');
        };
    }

    childrenElements(): { [key: string]: HTMLElement } {
        return {
            firstNameField: createElement({ tag: 'input', style: style['first-name'] }, true),
            secondNameField: createElement({ tag: 'input', style: style['second-name'] }, true),
            loginBTN: createElement({ tag: 'button', text: 'Login' }),
        };
    }

    appendElements(): void {
        this.contentWrap.append(...Object.values(this.elements));
    }
}

export default LoginPage;
