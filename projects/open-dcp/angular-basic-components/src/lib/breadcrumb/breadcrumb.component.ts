import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

export interface BreadCrumbModel {
 label: string; 
 url?: string;
}

@Component({
  selector: 'odcp-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="breadcrumb" *ngIf="breadcrumbs?.length">
      <ol class="breadcrumb">
        <li
          *ngFor="let crumb of breadcrumbs; let last = last"
          class="breadcrumb-item"
          [class.active]="last"
          [attr.aria-current]="last ? 'page' : null"
        >
          <ng-container *ngIf="!last && crumb.url; else lastItem">
            <a [routerLink]="crumb.url" class="breadcrumb-link">
              {{ crumb.label }}
            </a>
          </ng-container>
          <ng-template #lastItem>
            <span class="breadcrumb-text">{{ crumb.label }}</span>
          </ng-template>
        </li>
      </ol>
    </nav>
  `,
  styles: [
    `
      .breadcrumb {
        background: transparent;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
      }

      .breadcrumb-item + .breadcrumb-item::before {
        content: '>';
        padding: 0 8px;
        color: #6c757d;
      }

      .breadcrumb-link {
        text-decoration: none;
        cursor: pointer;
      }

      .breadcrumb-item.active .breadcrumb-text {
        color: #6c757d;
      }
    `,
  ],
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: BreadCrumbModel[] = [];
}
