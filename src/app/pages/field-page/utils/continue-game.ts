import { hasNextWord } from '@pages/field-page/utils/has-next-word';
import { setNextLevelOrRound } from '@pages/field-page/utils/set-next-level-or-round';
import { autofillBtnDisabled, currentWord, fieldHintText } from '@shared/observables';
import { getCurrentWordByIndex } from '@shared/utils/get-current-word';
import { clearCorrectIncorrectSentence } from '@shared/utils/clear-correct-Incorrect-Sentence';
import { translationHintText } from '../field/translation-hint-text';

export const continueGame = (): void => {
    const { wordIndex } = currentWord.value;
    if (hasNextWord()) {
        currentWord.publish(getCurrentWordByIndex(wordIndex + 1));
    } else {
        setNextLevelOrRound();
        clearCorrectIncorrectSentence();
    }

    if (fieldHintText.value !== translationHintText) {
        fieldHintText.publish(translationHintText);
    }

    if (autofillBtnDisabled.value) {
        autofillBtnDisabled.publish(false);
    }
};
