/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddExamresultsComponent } from './add-examresults.component';

describe('AddExamresultsComponent', () => {
  let component: AddExamresultsComponent;
  let fixture: ComponentFixture<AddExamresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExamresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
