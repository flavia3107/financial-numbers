import { TestBed } from '@angular/core/testing';
import { FinancialInputsStateService } from './financial-inputs-state.service';

describe('FinancialInputsStateService', () => {
	let service: FinancialInputsStateService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FinancialInputsStateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should initialize with empty inputs array', () => {
		const inputs = service.getInputs();
		expect(inputs()).toEqual([]);
	});

	it('should set and get inputs correctly', () => {
		const testInputs = [
			{ oldVal: '5k', converted: 5000 },
			{ oldVal: '.5b', converted: 500000000 },
			{ oldVal: 'invalid', converted: null },
		];

		service.setInputs(testInputs);

		const inputs = service.getInputs();
		expect(inputs()).toEqual(testInputs);
	});
});