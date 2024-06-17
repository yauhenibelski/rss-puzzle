export const shiftElementsLeftByOpacity = (parentElem: HTMLDivElement): void => {
    const childList = Array.from(parentElem.children);

    childList.sort((a: Element, b: Element) => {
        const aShowAttributeValue = a.getAttribute('show') === 'true';
        const bShowAttributeValue = b.getAttribute('show') === 'true';

        return Number(bShowAttributeValue) - Number(aShowAttributeValue);
    });
    parentElem.append(...childList);
};
