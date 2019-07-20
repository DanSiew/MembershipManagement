import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AppTextInputComponent, ShowErrorsComponent } from 'app/common-shared';

describe('TextInputComponent', () => {
  let component: AppTextInputComponent;
  let fixture: ComponentFixture<AppTextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppTextInputComponent,
        ShowErrorsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTextInputComponent);
    component = fixture.componentInstance;
    component.textInputModel = {
      eventComponent: 'Test Input',
      inputName: 'Test',
      inputName2: '',
      inputLabel: 'Test',
      inputLabel2: '',
      minLength: 1,
      maxLength: 255,
      isRequired: true,
      maxDate: { year: 2200, month: 1, day: 1 },
      minDate: { year: 1900, month: 1, day: 1 },
      max: 0,
      min: 0,
      hasMax: false,
      decimalPlace: 0,
      textAreaRow: 0
    };
    component.formControl = new FormControl('');

    fixture.detectChanges();
  });

  it('should be setting inputName="Test"', async(() => {
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('input'));
      component.textInputModel.inputName = 'Test';
      fixture.detectChanges();
      expect(input.nativeElement.id).toBe('Test');
    });
  }));

  it('should be setting value to someValue', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;
      el.value = 'someValue';
      el.dispatchEvent(new Event('input'));
      expect(fixture.componentInstance.value).toBe('someValue');
    });
  }));
  
});
