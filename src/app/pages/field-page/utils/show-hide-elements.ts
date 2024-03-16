export const showHideElements = (
    hideElem: HTMLDivElement,
    showElem: HTMLDivElement,
    sideEffect: () => void,
) => {
    showElem.setAttribute('show', 'true');
    hideElem.setAttribute('show', 'false');
    setTimeout(() => {
        hideElem.style.opacity = '0';
    });
    setTimeout(() => {
        sideEffect();
    }, 200);
    setTimeout(() => {
        showElem.style.opacity = '1';
    }, 300);
};
