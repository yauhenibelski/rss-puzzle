interface CreateElementProps {
    tag: keyof HTMLElementTagNameMap;
    style?: string | string[];
    text?: string;
    html?: string;
}

const setStyle = (elem: HTMLElement, style: string | string[]) => {
    if (style instanceof Array) {
        elem.classList.add(...style);
    }
    if (typeof style === 'string') {
        elem.classList.add(style);
    }
};
const createElement = (
    { tag, style, text, html }: CreateElementProps,
    needWrap?: boolean,
): HTMLElement => {
    const elem = document.createElement(tag);
    const elemWrap = document.createElement('div');

    if (text) elem.innerText = text;
    if (html) elem.innerHTML = html;

    if (style && !needWrap) setStyle(elem, style);

    if (needWrap) {
        if (style) setStyle(elemWrap, style);
        elemWrap.append(elem);
    }

    return needWrap ? elemWrap : elem;
};

export default createElement;
