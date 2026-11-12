import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ThemePalette } from '@angular/material/core';
import {MatButton} from "@angular/material/button";
import {RouterLinkActive} from "@angular/router";

export interface ToggleButtonItem {
  label: string;
  value: string;
}

@Component({
  selector: 'odcp-toggle-button',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatButton],
  template: `
    <div class="odcp-toggle">
      <button
        mat-button
        *ngFor="let btn of buttons"
        [ngClass]="{'odcp-toggle_button--active': selected === btn.value}"
        (click)="onToggle(btn)"
        class="odcp-toggle_button"
      >
        {{ btn.label }}
      </button>
    </div>
  `,
  styles: []
})
export class ToggleButtonComponent implements OnInit {
  @Input() buttons: ToggleButtonItem[] = [];
  @Input() selected?: string;

  @Output() toggled = new EventEmitter<string>();

  defaultSelected: ThemePalette = 'primary';
  defaultUnselected = '#e0e0e0';

  onToggle(selectedValue: ToggleButtonItem): void {
    this.selected = selectedValue.value;
    this.toggled.emit(selectedValue.value);
  }

  ngOnInit(): void {
    if (!this.selected && this.buttons.length > 0) {
      this.selected = this.buttons[0].value;
    }
  }
}
