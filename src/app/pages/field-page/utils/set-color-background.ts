// eslint-disable-next-line no-shadow
enum BackgroundColor {
    warn = '#fff0f0',
    good = '#f0fff0',
    miss = '#ffe8b8',
    none = '',
}

export const setColorBackground = (
    elements: HTMLDivElement | HTMLDivElement[],
    color: 'warn' | 'good' | 'none' | 'miss',
): void => {
    if (elements instanceof Array) {
        elements.forEach(elem => {
            elem.style.backgroundColor = BackgroundColor[color];
        });
        return;
    }

    elements.style.backgroundColor = BackgroundColor[color];
};
