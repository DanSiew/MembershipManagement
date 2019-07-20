import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ShowErrorsComponent } from 'app/common-shared';

describe('ShowErrorsComponent', () => {
  let component: ShowErrorsComponent;
  let fixture: ComponentFixture<ShowErrorsComponent>;
  let control: FormControl = new FormControl('', Validators.required);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowErrorsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowErrorsComponent);
    component = fixture.componentInstance;
    component.control = control;
    component.inputLabel = 'First Name'
    fixture.detectChanges();
  });

  it('should showed error', async(() => {
    fixture.whenStable().then(() => {
      control.markAsTouched();
      control.setErrors({ 'required': true });
      fixture.detectChanges();
      expect(component.shouldShowErrors()).toEqual(true);
    });
  }));

  it('should has one error', async(() => {
    fixture.whenStable().then(() => {
      control.markAsTouched();
      control.setErrors({ 'required': true });
      fixture.detectChanges();
      expect(component.listOfErrors().length).toEqual(1);
    });
  }));

});
