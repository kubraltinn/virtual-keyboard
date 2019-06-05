export const LETTERS_SET = "lettersSet";
export const NUMBERS_SET = "numbersSet";
export const CHARACTERS_SET = "charactersSet";

export class LetterInput {
  isSpace: boolean;
  isSpecialChar: boolean;
  isReadOnly: boolean;
  value: string;
}

export class KeyboardSet {
  topSet: string[];
  bottomSet: string[];
  middleSet: string[];
}
