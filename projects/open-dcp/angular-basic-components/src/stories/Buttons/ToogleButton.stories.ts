import type { Meta, StoryObj } from '@storybook/angular';

import { ToggleButtonComponent, ToggleButtonItem } from '../../lib/buttons/toggle-button/toggle-button.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ToggleButtonComponent> = {
  title: 'Buttons/Toggle Button',
  component: ToggleButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    toggled: { action: 'toggled' }
  },
};

export default meta;
type Story = StoryObj<ToggleButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ToggleButton: Story = {
  render: (args) => ({
    props: {
      ...args,
      onToggleChange: (event: any) => {
        console.log('Toggled:', event);
      },
    },
    template: `
      <odcp-toggle-button
        [buttons]="buttons"
        [selected]="selected"
        (toggled)="onToggleChange($event)">
      </odcp-toggle-button>
    `,
  }),
  args: {
    buttons: [
      { label: 'Daily', value: 'daily' },
      { label: 'Weekly', value: 'weekly' },
      { label: 'Monthly', value: 'monthly' },
    ] as ToggleButtonItem[],
    selected: 'weekly',
  },
};
