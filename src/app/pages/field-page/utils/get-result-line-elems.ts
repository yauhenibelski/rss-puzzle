import { currentWord$, playField$ } from '@shared/observables';

export const getResultLineElements = (): HTMLDivElement[] | null => {
    const resultBlock = playField$.value;
    if (!resultBlock) return null;

    const { wordIndex } = currentWord$.value;

    return Array.from([...resultBlock.children][wordIndex].children) as HTMLDivElement[];
};
