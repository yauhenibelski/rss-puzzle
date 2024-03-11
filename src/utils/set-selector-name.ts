import { getCustomName } from '@utils/get-custom-component-name';

function CustomSelector(name: string) {
    return function (fnConstructor: Function) {
        const constructor = fnConstructor;

        customElements.define(
            getCustomName(name),
            constructor as unknown as CustomElementConstructor,
        );

        Object.defineProperty(constructor.prototype, 'customTagName', {
            value: name,
            writable: false,
        });
    };
}

export default CustomSelector;
