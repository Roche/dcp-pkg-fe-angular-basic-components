import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'odcp-gxp-icon',
  standalone: true,
  template: `<div class="gxp-label"
                  [ngClass]="{
     'gxp-label-none': !isValidated && !isDisabled,
     'gxp-label--small': size === 'small',
     'gxp-label--disabled': isDisabled
     }">
    <ng-container *ngIf="!isDisabled; else isDisabledTmp">
      <span>Non </span> GXP
    </ng-container>
    <ng-template #isDisabledTmp>
      Undefined
    </ng-template>
  </div>
  `,
  imports: [
    NgClass,
    TranslateModule,
    NgIf
  ],
  styles: `.gxp-label--small {
      --gxp-icon-font-size: 10px !important;
      --gxp-icon-height: 18px !important;
      --gxp-icon-letter-spacing: .8px !important;
      --gxp-icon-border-radius: 3px !important;
    padding: 0 4px !important;
  }`
})
export class GxpIconComponent {
  @Input() isValidated = false;

  @Input() isDisabled = false;

  @Input() size: 'small' | 'normal' = 'normal';
}
