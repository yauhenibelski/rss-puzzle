export const showHideElements = (hideElem: HTMLDivElement, showElem: HTMLDivElement) => {
    showElem.setAttribute('show', 'true');
    hideElem.setAttribute('show', 'false');
    setTimeout(() => {
        showElem.style.opacity = '1';
        hideElem.style.opacity = '0';
    });
};
