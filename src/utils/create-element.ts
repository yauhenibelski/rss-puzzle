interface CreateElementProps {
    tag: keyof HTMLElementTagNameMap;
    style?: string | string[];
    text?: string;
    html?: string;
}

const createElement = ({ tag, style, text, html }: CreateElementProps): HTMLElement => {
    const elem = document.createElement(tag);

    if (text) elem.innerText = text;
    if (html) elem.innerHTML = html;

    if (style) {
        if (style instanceof Array) {
            elem.classList.add(...style);
        }
        if (typeof style === 'string') {
            elem.classList.add(style);
        }
    }
    return elem;
};

export default createElement;
