import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { invalidFormat } from '../../common/custom-validator';
import { convertShorthandToNumber } from '../../common/utils';
import { FinancialInputsStateService } from '../../services/financial-inputs-state.service';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _inputStateService = inject(FinancialInputsStateService);
  public inputForm: FormGroup = this._fb.group({
    financialInputs: this._fb.array([this._createInput()]),
  });

  get financialInputs(): FormArray {
    return this.inputForm.get('financialInputs') as FormArray;
  }

  private _createInput(): FormGroup {
    return this._fb.group({
      value: ['', [Validators.required, invalidFormat()]],
    });
  }

  public addInput() {
    this.financialInputs.push(this._createInput());
  }

  public removeInput(index: number) {
    if (this.financialInputs.length > 1) {
      this.financialInputs.removeAt(index);
    }
  }

  public onSubmit() {
    if (this.inputForm.valid) {
      const allValues = this.financialInputs.controls.map(ctrl => {
        const oldVal = ctrl.get('value')?.value ?? '';
        const converted = convertShorthandToNumber(oldVal);
        return { oldVal, converted };
      });
      this._inputStateService.setInputs(allValues);
      this._router.navigate(['/output']);
    }
  }
}
