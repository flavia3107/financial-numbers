import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FinancialInputsStateService } from '../../services/financial-inputs-state.service';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  const mockFinancialInputsStateService = {
    getInputs: jasmine.createSpy('getInputs'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: {}, params: {}, queryParams: {} } },
      { provide: FinancialInputsStateService, useValue: mockFinancialInputsStateService }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
