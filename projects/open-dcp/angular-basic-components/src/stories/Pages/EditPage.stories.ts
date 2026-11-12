import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {PageTitleComponent} from "../../lib/pages/page-title/page-title.component";
import {PageSubtitleComponent} from "../../lib/pages/page-subtitle/page-subtitle.component";
import {EditPageTemplateComponent} from "../../lib/pages/edit-page-template/edit-page-template.component";
import {TextButtonComponent} from "../../lib/buttons/text-button/text-button.component";
import {DefaultButtonComponent} from "../../lib/buttons/default-button/default-button.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<EditPageTemplateComponent> = {
  title: 'Pages/Edit page',
  component: EditPageTemplateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [PageTitleComponent, PageSubtitleComponent, TextButtonComponent, DefaultButtonComponent],
    })
  ],
  args: {
    noFooter: false
  }
};

export default meta;
type Story = StoryObj<EditPageTemplateComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args) => ({
    props: {
      ...args
    },
    template: `
<odcp-edit-page-template [noFooter]="noFooter">
    <odcp-page-title pageHeader>Page title</odcp-page-title>
    <odcp-page-subtitle pageHeader style="margin-left: 1rem;">Page subtitle</odcp-page-subtitle>

    <p>Page content</p>

    <odcp-text-button pageFooter>Cancel</odcp-text-button>
    <odcp-default-button pageFooter style="margin-left: 1rem;">Save</odcp-default-button>
</odcp-edit-page-template>
`
  }),
};
