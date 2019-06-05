import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { CHARACTERS_SET, KeyboardSet, LetterInput, LETTERS_SET, NUMBERS_SET } from "../keyboard";
import * as _ from "lodash";

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.css']
})
export class VirtualKeyboardComponent {
  private upperCaseActive: boolean = false;
  private lettersSet: KeyboardSet;
  private numbersSet: KeyboardSet;
  private charactersSet: KeyboardSet;
  private currentKeyboardSet: string = LETTERS_SET;
  private lastVirtualInput: string = "";
  private adjustedReadonlyIndex: number;

  @Output() onBackSpace = new EventEmitter();
  @Output() onSpace = new EventEmitter();
  @Output() onReturn = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onVirtualInput = new EventEmitter<string>();

  constructor(private zone: NgZone) {
    this.initialize();
  }

  private initialize(): void {
    this.initializeLetters();
  }

  private initializeLetters(): void {
    const LETTERS_ON_TOP = "qwertyuiop";
    const LETTERS_ON_MIDDLE = "asdfghjkl";
    const LETTERS_ON_BOTTOM = "zxcvbnm";

    const CHARACTERS_ON_TOP = "1234567890";
    const CHARACTERS_ON_MIDDLE = "-/:;()$&@\"";
    const CHARACTERS_ON_BOTTOM = ".,?!'";

    const SECOND_CHARACTERS_ON_TOP = "[]{}#%^*+=";
    const SECOND_CHARACTERS_ON_MIDDLE = "_\\|~<>€£¥•";

    let topLetters = this.generateSet(LETTERS_ON_TOP);
    let middleLetters = this.generateSet(LETTERS_ON_MIDDLE);
    let bottomLetters = this.generateSet(LETTERS_ON_BOTTOM);

    this.lettersSet = {
      topSet: this.generateVirtualLetters(topLetters),
      bottomSet: this.generateVirtualLetters(bottomLetters),
      middleSet: this.generateVirtualLetters(middleLetters)
    };

    let topNumbers = this.generateSet(CHARACTERS_ON_TOP);
    let middleNumbers = this.generateSet(CHARACTERS_ON_MIDDLE);
    let bottomCharacters = this.generateSet(CHARACTERS_ON_BOTTOM);

    this.numbersSet = {
      topSet: this.generateVirtualLetters(topNumbers),
      bottomSet: this.generateVirtualLetters(bottomCharacters),
      middleSet: this.generateVirtualLetters(middleNumbers)
    };

    let secondTopCharacters = this.generateSet(SECOND_CHARACTERS_ON_TOP);
    let secondMiddleCharacters = this.generateSet(SECOND_CHARACTERS_ON_MIDDLE);

    this.charactersSet = {
      topSet: this.generateVirtualLetters(secondTopCharacters),
      bottomSet: this.generateVirtualLetters(bottomCharacters),
      middleSet: this.generateVirtualLetters(secondMiddleCharacters)
    };

  }

  getLastVirtualInput(): string {
    return this.lastVirtualInput;
  }

  onVirtualInputEntered(letter: string): void {
    this.zone.runOutsideAngular(() => {
      this.zone.run(() => {
        letter = this.isUpperCaseActive() ? letter.toUpperCase() : letter.toLowerCase();
        this.onInput(letter);
        this.lastVirtualInput = letter;
      });
    });
  }

  private onInput(letter: string): void {
      this.onVirtualInput.emit(letter);
  }

  isLettersSetActive(): boolean {
    return this.getCurrentKeyboardSet() == LETTERS_SET;
  }

  isNumbersSetActive(): boolean {
    return this.getCurrentKeyboardSet() == NUMBERS_SET;
  }

  isCharactersSetActive(): boolean {
    return this.getCurrentKeyboardSet() == CHARACTERS_SET;
  }

  getCurrentKeyboardSet(): string {
    return this.currentKeyboardSet;
  }

  setCurrentKeyboardSet(currentKeyboardSet: string): void {
    this.currentKeyboardSet = currentKeyboardSet;
  }

  getTopVirtualSet(): string[] {
    if (this.isLettersSetActive()) {
      return this.lettersSet.topSet;
    }
    else if (this.isNumbersSetActive()) {
      return this.numbersSet.topSet;
    }
    return this.charactersSet.topSet;
  }

  getMiddleVirtualSet(): string[] {
    if (this.isLettersSetActive()) {
      return this.lettersSet.middleSet;
    }
    else if (this.isNumbersSetActive()) {
      return this.numbersSet.middleSet;
    }
    return this.charactersSet.middleSet;
  }

  getBottomVirtualSet(): string[] {
    if (this.isLettersSetActive()) {
      return this.lettersSet.bottomSet;
    }
    else if (this.isNumbersSetActive()) {
      return this.numbersSet.bottomSet;
    }
    return this.charactersSet.bottomSet;
  }

  generateVirtualLetters(topLetters: LetterInput[]): string[] {
    return _.chain(topLetters)
      .map(letterSet => letterSet.value)
      .value();
  }

  generateSet(letters: string): LetterInput[] {
    this.adjustedReadonlyIndex = 0;

    return _.reduce(letters.split(""), (acc, letter, index) => {
      let isSpecialChar = /[^A-Za-z]/gi.test(letter);
      let isSpace = /\s+/.test(letter);
      if (this.isUpperCaseActive()) {
        letter = letter.toUpperCase();
      }
      else {
        letter = letter.toLowerCase();
      }

      acc[index] = {
        isSpace: isSpace,
        isSpecialChar: isSpecialChar,
        isReadOnly: index <= this.adjustedReadonlyIndex,
        value: letter
      };

      return acc;
    }, []);
  }

  changeKeyboardSet(keyboardSet: string): void {
    if (keyboardSet == NUMBERS_SET) {
      this.setCurrentKeyboardSet(NUMBERS_SET);
      return;
    }

    else if (keyboardSet == LETTERS_SET) {
      this.setCurrentKeyboardSet(LETTERS_SET);
      return;
    }
    this.setCurrentKeyboardSet(CHARACTERS_SET);
  }

  convertCase(): void {
    this.upperCaseActive ? this.upperCaseActive = false : this.upperCaseActive = true;
  }

  isUpperCaseActive(): boolean {
    return this.upperCaseActive;
  }

  onDeletePressed(): void {
    this.onDelete.emit();
  }

  onReturnPressed(): void {
    let returnLetter = "\x0a";
    this.onReturn.emit();
  }

  onSpacePressed(): void {
    let spaceLetter = "\xa0";
    this.onSpace.emit();
  }

  onBackSpacePressed(): void {
    this.onDeletePressed();
    this.onBackSpace.emit();
  }

}
