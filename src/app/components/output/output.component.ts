import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinancialInputsStateService } from '../../services/financial-inputs-state.service';

@Component({
  selector: 'app-output',
  imports: [RouterModule],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss',
})
export class OutputComponent {
  private _inputsService = inject(FinancialInputsStateService);
  public inputList = this._inputsService.getInputs();
  public avgValue = computed(() => this._calculateAvg());

  private _calculateAvg() {
    const values = this.inputList()
      .map(v => v.converted)
      .filter((n): n is number => n != null && !isNaN(n));
    return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  }
}
