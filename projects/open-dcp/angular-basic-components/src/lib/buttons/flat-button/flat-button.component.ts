import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ThemePalette} from "@angular/material/core";
import {CommonModule} from "@angular/common";
import {ClickListener} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-flat-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButton
  ],
  template: `<button mat-flat-button
                     [disabled]="disabled"
                     [color]="color || undefined">
    <ng-content></ng-content>
  </button>
  `,
  styles: ``
})
export class FlatButtonComponent extends ClickListener {
  @Input() override  disabled: boolean = false;

  @Input() color: ThemePalette  = undefined;
  constructor() {
    super();
  }
}
