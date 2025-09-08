import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialInputsStateService } from '../../services/financial-inputs-state.service';
import { InputComponent } from './input.component';


describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let mockStateService: jasmine.SpyObj<FinancialInputsStateService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockStateService = jasmine.createSpyObj('FinancialInputsStateService', ['setInputs']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: { snapshot: {}, params: {}, queryParams: {} } },
        { provide: FinancialInputsStateService, useValue: mockStateService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize form with one input', () => {
    expect(component).toBeTruthy();
    expect(component.financialInputs.length).toBe(1);
  });

  it('should add input field', () => {
    component.addInput();
    expect(component.financialInputs.length).toBe(2);
  });

  it('should remove input field if more than one exists', () => {
    component.addInput();
    expect(component.financialInputs.length).toBe(2);

    component.removeInput(0);
    expect(component.financialInputs.length).toBe(1);
  });

  it('should not remove input field if only one exists', () => {
    expect(component.financialInputs.length).toBe(1);
    component.removeInput(0);
    expect(component.financialInputs.length).toBe(1);
  });

  it('should call setInputs and navigate on valid form submit', () => {
    component.financialInputs.at(0).get('value')?.setValue('5k');
    component.addInput();
    component.financialInputs.at(1).get('value')?.setValue('invalid');

    expect(component.inputForm.valid).toBeFalse();
    component.financialInputs.at(1).get('value')?.setValue('10k');

    expect(component.inputForm.valid).toBeTrue();
    component.onSubmit();

    expect(mockStateService.setInputs).toHaveBeenCalledWith([
      { oldVal: '5k', converted: 5000 },
      { oldVal: '10k', converted: 10000 }, // as per mock convertShorthandToNumber above
    ]);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/output']);
  });

  it('should not call setInputs or navigate if form is invalid', () => {
    component.financialInputs.at(0).get('value')?.setValue('');
    component.onSubmit();
    expect(mockStateService.setInputs).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});