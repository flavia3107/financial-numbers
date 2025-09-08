import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FinancialInputsStateService {
	private _inputs = signal<{ oldVal: string, converted: number | null }[]>([]);

	public setInputs(inputs: { oldVal: string, converted: number | null }[]) {
		this._inputs.set(inputs);
	}
	public getInputs() {
		return this._inputs.asReadonly();
	}
}