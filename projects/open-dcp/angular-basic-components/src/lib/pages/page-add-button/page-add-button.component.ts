import {Component, Input, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";

export interface AddMenuButtonsModel {
  title: string;
  routerLink: string[];
}

/**
 * Component for page menu for create new entities
 * Use [buttonSetup] to setup it
 */
@Component({
  selector: 'odcp-page-add-button',
  standalone: true,
  styleUrls: [],
  imports: [
    TranslateModule,
    MatButton,
    RouterLink,
    MatTooltip,
    MatIcon
  ],
  template: `
    <button mat-flat-button
            class="page-create-menu_button-show-extra"
            color=''
            [matTooltip]="buttonSetup.title | translate"
            matTooltipPosition="above"
            [routerLink]="buttonSetup.routerLink">
      +<!--<mat-icon>add</mat-icon>-->
    </button>
  `
})
export class PageAddButtonComponent {
  @Input({required: true}) buttonSetup!: AddMenuButtonsModel;

}
