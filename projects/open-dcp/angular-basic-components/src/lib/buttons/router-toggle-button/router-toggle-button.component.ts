import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ThemePalette } from '@angular/material/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButton} from "@angular/material/button";

export interface RouterToggleButtonItem {
  label: string;
  link: string;
}

@Component({
  selector: 'odcp-router-toggle-button',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, MatButton],
  template: `
    <div class="odcp-toggle">
      <button
        mat-button
        *ngFor="let btn of buttons"
        [routerLink]="btn.link"
        routerLinkActive="odcp-toggle_button--active"
        class="odcp-toggle_button"
      >
        {{ btn.label }}
      </button>
    </div>
  `,
  styles: []
})
export class RouterToggleButtonComponent {
  @Input() buttons: RouterToggleButtonItem[] = [];

  @Output() toggled = new EventEmitter<string>();
}
