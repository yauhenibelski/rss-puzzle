import { CurrentLevelRound } from '@interfaces/current-level';
import Observable from '@utils/observer-template';
import { Word } from '@interfaces/word-collection';
import { getCurrentWordByIndex } from './utils/get-current-word';

export const currentLevel = new Observable<CurrentLevelRound>({
    level: 0,
    round: 0,
});

export const currentWord = new Observable<{ word: Word; wordIndex: number }>(getCurrentWordByIndex(0));

export const canCheck = new Observable<boolean>(false);
