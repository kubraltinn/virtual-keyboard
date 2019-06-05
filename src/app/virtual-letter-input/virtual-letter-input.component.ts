import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-virtual-letter-input',
  templateUrl: './virtual-letter-input.component.html',
  styleUrls: ['./virtual-letter-input.component.css']
})
export class VirtualLetterInputComponent {

    @Input() virtualLetterSet: string[];
    @Input() lastVirtualInput: string;
    @Input() upperCaseActive: boolean;
    @Input() lettersSetActive: boolean;
    @Input() numbersSetActive: boolean;
    @Input() charactersSetActive: boolean;
    @Input() showReturnButton: boolean = false;
    @Input() showSpaceBar: boolean = false;
    @Input() showNumbersButton: boolean = false;
    @Input() showArrowButton: boolean = false;
    @Input() showLettersButton: boolean = false;
    @Input() showLittleBackSpaceButton: boolean = false;
    @Input() showBigBackSpaceButton: boolean = false;
    @Input() activateBottomCharsClass: boolean = false;
    @Input() showCharsButton: boolean = false;
    @Output() onVirtualInput = new EventEmitter<string>();
    @Output() onBackSpace = new EventEmitter();
    @Output() onSpace = new EventEmitter();
    @Output() onReturn = new EventEmitter();
    @Output() onConvertCase = new EventEmitter();
    @Output() onChangeKeyboardSet = new EventEmitter<string>();

    @ViewChild("letterset", {read: ElementRef}) letterset: ElementRef;
    @ViewChild("letterPopover") letterPopover: NgbPopover;

    static readonly TOOLTIP_TIMEOUT: number = 100;

    constructor() {
    }

    showPopover(letterPopover: NgbPopover): void {
      this.timeoutPopover(letterPopover);
      letterPopover.open();
    }

    timeoutPopover(letterPopover: NgbPopover): void {
      setTimeout(() => {
        this.disablePopover(letterPopover);
      }, VirtualLetterInputComponent.TOOLTIP_TIMEOUT);
    }

    disablePopover(letterPopover: NgbPopover): void {
      letterPopover.close();
    }

    getLastVirtualInput(): string {
      return this.lastVirtualInput;
    }

    setLastVirtualInput(lastVirtualInput: string): void {
      this.lastVirtualInput = lastVirtualInput;
    }

    getVirtualLetterSet(): string[] {
      return this.virtualLetterSet;
    }

    onNewVirtualInput(letter: string): void {
      this.onVirtualInput.emit(letter);
      this.setLastVirtualInput(letter);
    }

    changeKeyboardSet(keyboardSet: string): void {
      this.onChangeKeyboardSet.emit(keyboardSet);
    }

    convertCase(): void {
      this.onConvertCase.emit();
    }

    onBackSpacePressed(): void {
      this.onBackSpace.emit();
    }

    onSpacePressed(): void {
      this.onSpace.emit();
    }

    onReturnPressed(): void {
      this.onReturn.emit();
    }

    isUpperCaseActive(): boolean {
      return this.upperCaseActive;
    }

    isLettersSetActive(): boolean {
      return this.lettersSetActive;
    }

    isNumbersSetActive(): boolean {
      return this.numbersSetActive;
    }

    isCharactersSetActive(): boolean {
      return this.charactersSetActive;
    }

    shouldShowNumbersButton(): boolean {
      return this.showNumbersButton;
    }

    shouldShowSpaceBar(): boolean {
      return this.showSpaceBar;
    }

    shouldShowLettersButton(): boolean {
      return this.showLettersButton;
    }

    shouldShowReturnButton(): boolean {
      return this.showReturnButton;
    }

    shouldShowCharsButton(): boolean {
      return this.showCharsButton;
    }

    shouldActivateBottomCharsClass(): boolean {
      return this.activateBottomCharsClass;
    }

    shouldShowLittleBackSpaceButton(): boolean {
      return this.showLittleBackSpaceButton;
    }

    shouldShowBigBackSpaceButton(): boolean {
      return this.showBigBackSpaceButton;
    }

    shouldShowArrowButton(): boolean {
      return this.showArrowButton;
    }

}
