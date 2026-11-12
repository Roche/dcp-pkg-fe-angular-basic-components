import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

export interface CreateMenuButtonsModel {
  title: string;
  tooltip?: string;
  click?: Function;
  routerLink?: string[];
}

export interface CreateMenuSetupModel {
  buttons: CreateMenuButtonsModel[];
}

/**
 * Component for page menu for create new entities
 * Use [buttonSetup] to setup it
 */
@Component({
  selector: 'odcp-page-create-menu',
  standalone: true,
  styleUrls: [],
  imports: [
    MatButton,
    MatTooltip,
    TranslateModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  template: `

    <div class="d-flex">
      <ng-container *ngIf="showExtraButtons">
        <ng-container *ngFor="let button of buttonSetup.buttons">
          <button
            mat-button
            color="primary"
            class="mr-3"
            [matTooltip]="button?.tooltip || '' | translate"
            matTooltipPosition="above"
            [disabled]="disabled"
            (click)="button.click ? button.click(button) : ''"
            [routerLink]="button.routerLink">
            {{ button.title | translate }}
          </button>
        </ng-container>
      </ng-container>

      <button mat-flat-button
              class="page-create-menu_button-show-extra"
              [color]="showExtraButtons ? 'primary' : ''"
              [disabled]="disabled"
              (click)="toggleExtraButtons()">+
      </button>
    </div>`
})
export class PageCreateMenuComponent implements OnChanges {
  @Input({required: true}) buttonSetup!: CreateMenuSetupModel;
  @Input() disabled: boolean = false;

  showExtraButtons = false;

  toggleExtraButtons() {
    if (this.disabled) {
      return;
    }

    this.showExtraButtons = !this.showExtraButtons;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disabled'] && this.disabled) {
      this.showExtraButtons = false;
    }
  }
}
