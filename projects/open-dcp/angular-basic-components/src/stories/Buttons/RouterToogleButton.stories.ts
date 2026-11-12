import {Meta, StoryObj} from '@storybook/angular';

import {
  RouterToggleButtonComponent,
  RouterToggleButtonItem
} from "../../lib/buttons/router-toggle-button/router-toggle-button.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<RouterToggleButtonComponent> = {
  title: 'Buttons/Router Toggle Button',
  component: RouterToggleButtonComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<RouterToggleButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const RouterToggleButton: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <odcp-router-toggle-button
        [buttons]="buttons">
      </odcp-router-toggle-button>
    `,
  }),
  args: {
    buttons: [
      { label: 'Test', link: '/test' },
      { label: 'Test 2', link: '/test2' }
    ] as RouterToggleButtonItem[]
  },
  parameters: {
    angularRouter: {active: '/test2'}
  }
};
