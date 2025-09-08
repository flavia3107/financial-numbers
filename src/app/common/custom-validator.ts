import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidNumberWithSuffix } from './utils';

export function invalidFormat(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;
		if (!value) return null;

		const valid = isValidNumberWithSuffix(value.trim());
		return valid ? null : { invalidFormat: true };
	};
}