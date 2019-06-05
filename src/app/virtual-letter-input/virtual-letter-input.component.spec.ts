import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLetterInputComponent } from './virtual-letter-input.component';

describe('VirtualLetterInputComponent', () => {
  let component: VirtualLetterInputComponent;
  let fixture: ComponentFixture<VirtualLetterInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualLetterInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualLetterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
