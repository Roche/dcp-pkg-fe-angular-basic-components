import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';

export interface StepItem {
  label: string;
  completed: boolean;
  editable?: boolean;
  templateRef: TemplateRef<any>;
}

@Component({
  selector: 'odcp-stepper',
  standalone: true,
  imports: [CommonModule, MatStepperModule, MatButtonModule],
  template: `
    <mat-horizontal-stepper #stepper [linear]="linear" labelPosition="bottom" class="custom-stepper">
      <ng-container *ngFor="let step of steps; let i = index">
        <mat-step [editable]="step.editable !== false" [completed]="step.completed">
          <ng-template matStepLabel>{{ step.label }}</ng-template>
          <ng-container
            *ngTemplateOutlet="step.templateRef; context: {
              $implicit: step, 
              next: next.bind(this),
              previous: previous.bind(this),
              isFirst: isFirst(i),
              isLast: isLast(i),
            }"
          ></ng-container>
        </mat-step>
      </ng-container>
    </mat-horizontal-stepper>
  `
})

export class StepperComponent {
  @Input() steps: StepItem[] = [];
  @Input() linear = true;

  @ContentChildren(TemplateRef) stepTemplates!: QueryList<TemplateRef<any>>;
  @ViewChild('stepper') stepper!: MatStepper;

  isFirst(index: number): boolean {
    return index === 0;
  }

  isLast(index: number): boolean {
    return index === this.steps.length - 1;
  }

  next(): void {
    const currentStep = this.stepper.selected;
    if (currentStep) {
      currentStep.completed = true;
    }
    this.stepper.next();
  }

  previous(): void {
    this.stepper.previous();
  }
}
