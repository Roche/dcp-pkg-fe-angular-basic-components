import { CommonModule } from "@angular/common";
import { Component, Input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { ThemePalette } from '@angular/material/core';
import {ClickListener} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-text-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButton
  ],
  template: `<button mat-button [disabled]="disabled" [color]="color">
    <ng-content></ng-content>
  </button>
  `,
  styles: ``
})
export class TextButtonComponent extends ClickListener {
  @Input() override  disabled: boolean = false;
  @Input() color: ThemePalette  = "primary";

  constructor() {
    super();
  }
}
