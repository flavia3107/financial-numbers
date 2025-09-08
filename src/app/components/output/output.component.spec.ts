import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutputComponent } from './output.component';
import { FinancialInputsStateService } from '../../services/financial-inputs-state.service';
import { signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;
  let mockInputsSignal: ReturnType<typeof signal>;

  const mockFinancialInputsStateService = {
    getInputs: jasmine.createSpy('getInputs'),
  };

  beforeEach(async () => {
    mockInputsSignal = signal<{ oldVal: string; converted: number | null }[]>([]);

    mockFinancialInputsStateService.getInputs.and.returnValue(mockInputsSignal.asReadonly());

    await TestBed.configureTestingModule({
      providers: [
        { provide: FinancialInputsStateService, useValue: mockFinancialInputsStateService },
        { provide: ActivatedRoute, useValue: { snapshot: {}, params: {}, queryParams: {} } }],
      imports: [RouterModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return 0 average when input list is empty', () => {
    mockInputsSignal.set([]);
    expect(component.avgValue()).toBe(0);
  });

  it('should calculate average correctly ignoring null or NaN', () => {
    const inputs = [
      { oldVal: '5k', converted: 5000 },
      { oldVal: 'invalid', converted: null },
      { oldVal: '1.5k', converted: 1500 },
      { oldVal: 'NaN', converted: NaN },
    ];
    mockInputsSignal.set(inputs);
    expect(component.avgValue()).toBeCloseTo(3250);
  });

  it('should update average reactively when inputs change', () => {
    mockInputsSignal.set([{ oldVal: '1k', converted: 1000 }]);
    expect(component.avgValue()).toBe(1000);

    mockInputsSignal.set([
      { oldVal: '1k', converted: 1000 },
      { oldVal: '2k', converted: 2000 },
    ]);
    expect(component.avgValue()).toBe(1500);
  });
});