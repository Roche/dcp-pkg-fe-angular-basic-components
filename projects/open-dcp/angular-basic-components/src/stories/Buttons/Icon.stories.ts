import type { Meta, StoryObj } from '@storybook/angular';

import { IconButtonComponent } from '../../lib/buttons/icon-button/icon-button.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<IconButtonComponent> = {
  title: 'Buttons/Icon Button',
  component: IconButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    }
  }
};

export default meta;
type Story = StoryObj<IconButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args) => ({
    template: `
<odcp-icon-button
    [disabled]="${args.disabled}">
    more_vert
</odcp-icon-button>

<odcp-icon-button
    [disabled]="${args.disabled}">
   open_in_new
</odcp-icon-button>

<odcp-icon-button
    [disabled]="${args.disabled}">
   close
</odcp-icon-button>

<odcp-icon-button
    [disabled]="${args.disabled}">
   add
</odcp-icon-button>
`
  }),
  args: {
    disabled: false
  },
};
