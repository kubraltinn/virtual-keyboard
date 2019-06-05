import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { VirtualLetterInputComponent } from './virtual-letter-input/virtual-letter-input.component';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularFontAwesomeModule } from "angular-font-awesome";

@NgModule({
  declarations: [
    AppComponent,
    VirtualLetterInputComponent,
    VirtualKeyboardComponent
  ],
  imports: [
    BrowserModule,
    NgbPopoverModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
    ])
  ],
  exports: [
    VirtualLetterInputComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
