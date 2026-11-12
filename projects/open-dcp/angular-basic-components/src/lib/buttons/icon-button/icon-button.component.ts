import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {ClickListener} from "@open-dcp/angular-services";
@Component({
  selector: 'odcp-icon-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `<button mat-icon-button [disabled]="disabled">
    <mat-icon>
      <ng-content/>
    </mat-icon>
  </button>
  `,
  styles: ``
})
export class IconButtonComponent extends ClickListener {
  @Input() override  disabled: boolean = false;
  constructor() {
    super();
  }
}
