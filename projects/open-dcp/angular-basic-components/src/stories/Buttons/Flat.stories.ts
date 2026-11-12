import type { Meta, StoryObj } from '@storybook/angular';

import { FlatButtonComponent } from '../../lib/buttons/flat-button/flat-button.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<FlatButtonComponent> = {
  title: 'Buttons/Flat Button',
  component: FlatButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    color: {
      control: {
        type: "select"
      },
      options: ['', 'primary', 'accent', 'warn']
    }
  }
};

export default meta;
type Story = StoryObj<FlatButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args) => ({
    template: `
<odcp-flat-button
    [disabled]="${args.disabled}"
    color="${args.color ? args.color : undefined}">
    Save
</odcp-flat-button>
`
  }),
  args: {
    disabled: false,
    color: undefined
  },
};
