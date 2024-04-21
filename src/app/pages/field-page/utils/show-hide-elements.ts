export const showHideElements = (
    hideElem: HTMLDivElement,
    showElem?: HTMLDivElement,
    sideEffect?: () => void,
): void => {
    showElem?.setAttribute('show', 'true');
    hideElem.setAttribute('show', 'false');
    setTimeout(() => {
        hideElem.style.opacity = '0';
    });
    setTimeout(() => {
        if (sideEffect) sideEffect();
    }, 200);
    setTimeout(() => {
        if (showElem) showElem.style.opacity = '1';
    }, 300);
};
