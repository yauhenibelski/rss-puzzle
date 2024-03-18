import { CurrentLevelRound } from '@interfaces/current-level';
import Observable from '@utils/observer-template';
import { Word } from '@interfaces/word-collection';
import { translationHintText } from '@pages/field-page/field/translation-hint-text';
import { getCurrentWordByIndex } from './utils/get-current-word';
import localStorage from './local-storage/local-storage';

export const currentLevel = new Observable<CurrentLevelRound>(localStorage.getNextRound());
export const currentWord = new Observable<{ word: Word; wordIndex: number }>(getCurrentWordByIndex(0));
export const canCheck = new Observable<boolean>(false);
export const canContinue = new Observable<boolean>(false);
export const playField = new Observable<HTMLDivElement | null>(null);
export const sourceBlockElements = new Observable<HTMLDivElement[] | null>(null);
export const pronounceBtnHidden = new Observable<boolean>(localStorage.getHintState().mute);
export const fieldHintText = new Observable<string>(translationHintText);
export const autofillBtnDisabled = new Observable<boolean>(false);
