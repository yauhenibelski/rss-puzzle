// eslint-disable-next-line no-shadow
enum BackgroundColor {
    warn = '#fff0f0',
    good = '#f0fff0',
    none = '',
}

export const setColorBackground = (
    elements: HTMLDivElement | HTMLDivElement[],
    color: 'warn' | 'good' | 'none',
): void => {
    if (elements instanceof Array) {
        elements.forEach(elem => {
            elem.style.backgroundColor = BackgroundColor[color];
        });
        return;
    }

    elements.style.backgroundColor = BackgroundColor[color];
};
