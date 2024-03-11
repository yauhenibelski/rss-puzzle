import createElement from '@utils/create-element';

class Component extends HTMLElement {
    protected contentWrap: HTMLElement;
    protected customTagName: string | unknown;

    constructor() {
        super();
        this.className = `${this.customTagName}`;
        this.contentWrap = createElement({
            tag: 'div',
            style: `${this.customTagName}-content-wrap`,
        });
        this.append(this.contentWrap);
    }
    createComponent(): void {
        // create component
    }

    connectedCallback(): void {
        // element added to page
    }

    disconnectedCallback(): void {
        //  element removed from page
    }

    adoptedCallback(): void {
        // element moved to new page
    }

    // attributeChangedCallback(name, oldValue, newValue): void {
    // Attribute ${name} has changed.
    // }

    getElement(): HTMLElement {
        return this;
    }

    render(): void {
        this.innerHTML = '';
        this.contentWrap.innerHTML = '';

        this.createComponent();
    }
}
export default Component;
