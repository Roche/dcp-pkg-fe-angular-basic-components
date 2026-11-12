import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {ThemePalette} from "@angular/material/core";
import {ClickListener} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-default-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButton
  ],
  template: `<button mat-raised-button
                     [disabled]="disabled"
                     [color]="color">
    <ng-content></ng-content>
  </button>
  `,
  styles: ``
})
export class DefaultButtonComponent extends ClickListener {
  @Input() override  disabled: boolean = false;
  @Input() color: ThemePalette  = "primary";
  constructor() {
    super();
  }
}
