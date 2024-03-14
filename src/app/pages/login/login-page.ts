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
        const loginBTN = <HTMLInputElement>this.elements.loginBTN;
        const form = <HTMLFormElement>this.elements.form;

        firstNameField.required = true;
        firstNameField.placeholder = 'example: John';

        secondNameField.required = true;
        secondNameField.placeholder = 'example: Smith';

        firstNameField.oninput = () => firstNameField.setCustomValidity('');
        secondNameField.oninput = () => secondNameField.setCustomValidity('');

        loginBTN.onclick = () => {
            const validFirstNameField = this.matchInputValue(firstNameField, 2);
            const validSecondNameField = this.matchInputValue(secondNameField, 3);
            const canSubmit = validFirstNameField && validSecondNameField;

            firstNameField.className = validFirstNameField ? '' : style.invalid;
            secondNameField.className = validSecondNameField ? '' : style.invalid;

            console.log(canSubmit);
        };
        form.onsubmit = (event: Event) => event.preventDefault();
    }

    childrenElements(): { [key: string]: HTMLElement } {
        return {
            form: createElement({ tag: 'form' }),
            firstNameField: createElement({ tag: 'input', style: style['first-name'] }, true),
            secondNameField: createElement({ tag: 'input', style: style['second-name'] }, true),
            loginBTN: createElement({ tag: 'button', text: 'Login' }),
        };
    }

    appendElements(): void {
        const { form, firstNameField, secondNameField, loginBTN } = this.elements;

        form.append(firstNameField, secondNameField, loginBTN);
        this.contentWrap.append(form);
    }

    matchInputValue(input: HTMLInputElement, minLength: number): boolean {
        const { value, validity } = input;
        if (value) {
            if (!value[0].match('[A-Z]')) {
                input.setCustomValidity('First letter should be in uppercase.');
                return false;
            }

            // eslint-disable-next-line prettier/prettier, no-useless-escape
            if (!value.match('^[a-zA-Z-]+$')) {
                input.setCustomValidity('Only the symbol "-" is allowed');
                return false;
            }

            // eslint-disable-next-line no-useless-escape
            if (!value.match(`^[a-zA-Z\-]{${minLength}}`)) {
                input.setCustomValidity(`Minimum length ${minLength + 1} characters`);
                return false;
            }
        }
        input.setCustomValidity('');
        return validity.valid;
    }
}

export default LoginPage;
