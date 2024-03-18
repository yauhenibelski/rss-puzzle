import { CurrentLevelRound } from '@interfaces/current-level.interface';
import Observable from '@utils/observer-template';
import { Word } from '@interfaces/word-collection.interface';
import { translationHintText } from '@pages/field-page/field/translation-hint-text';
import { CorrectIncorrectWords } from '@interfaces/correct-incorrect.interface';
import { getCurrentWordByIndex } from './utils/get-current-word';

export const currentLevel = new Observable<CurrentLevelRound>({ level: 0, round: 0 });
export const currentWord = new Observable<{ word: Word; wordIndex: number }>(getCurrentWordByIndex(0));
export const canCheck = new Observable<boolean>(false);
export const canContinue = new Observable<boolean>(false);
export const playField = new Observable<HTMLDivElement | null>(null);
export const sourceBlockElements = new Observable<HTMLDivElement[] | null>(null);
export const pronounceBtnHidden = new Observable<boolean>(true);
export const fieldHintText = new Observable<string>(translationHintText);
export const autofillBtnDisabled = new Observable<boolean>(false);
export const resultBtnDisabled = new Observable<boolean>(true);
export const correctIncorrectSentence = new Observable<CorrectIncorrectWords>({
    correct: [],
    incorrect: [],
});
