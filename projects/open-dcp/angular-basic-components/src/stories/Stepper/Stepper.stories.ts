import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { StepperComponent } from '../../lib/stepper/stepper/stepper.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<StepperComponent> = {
  title: 'Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
      ],
    }),
  ],
  argTypes: {
    steps: {
      control: { type: 'object' },
      description: 'Step details',
      defaultValue:  [
        {
          label: 'Step 1',    
          completed: false,
        },
        {
          label: 'Step 2',    
          completed: false,
        }
      ],
    },
  },
};

export default meta;
type Story = StoryObj<StepperComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args, context) => ({
    props: args,
    template: `
      <ng-template #odcpStep let-step let-isFirst="isFirst" let-isLast="isLast" let-next="next" let-previous="previous" let-label="label">
        <h2>{{ step.label }}</h2>
        <div>Step Content goes here...</div>

        <div class="actions">
          <button mat-button (click)="previous()" *ngIf="!isFirst">Previous</button>
          <button mat-button (click)="next()" *ngIf="!isLast">Next</button>
        </div>
      </ng-template>

      <odcp-stepper
        [steps]="[
          { label: 'Step 1', templateRef: odcpStep },
          { label: 'Step 2', templateRef: odcpStep },
          { label: 'Step 3', templateRef: odcpStep }
        ]">
      </odcp-stepper>
    `,
  }),
  args: {},
};
