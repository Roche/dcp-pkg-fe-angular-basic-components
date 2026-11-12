import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {BasicPageTemplateComponent} from "../../lib/pages/basic-page-template/basic-page-template.component";
import {PageTitleComponent} from "../../lib/pages/page-title/page-title.component";
import {PageSubtitleComponent} from "../../lib/pages/page-subtitle/page-subtitle.component";
import {SectionPaperTitleComponent} from "../../lib/pages/section-paper-title/section-paper-title.component";
import {PageAddButtonComponent} from "../../lib/pages/page-add-button/page-add-button.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";
import {PageCreateMenuComponent} from "../../lib/pages/page-create-menu/page-create-menu.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<BasicPageTemplateComponent> = {
  title: 'Pages/Basic page',
  component: BasicPageTemplateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, RouterTestingModule, TranslateModule.forRoot({
        defaultLanguage: 'en'
      }), PageTitleComponent, PageSubtitleComponent, SectionPaperTitleComponent, PageAddButtonComponent, PageCreateMenuComponent],
    })
  ]
};

export default meta;
type Story = StoryObj<BasicPageTemplateComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicUsage: Story = {
  render: (args) => ({
    template: `
<odcp-basic-page-template>
    <odcp-page-title pageHeader>Page title</odcp-page-title>
    <odcp-page-subtitle pageHeader style="margin-left: 1rem;">Page subtitle</odcp-page-subtitle>

    <p nonPaperContent>Content without a background (e.g., filters)</p>

    <odcp-section-paper-title>Paper content title</odcp-section-paper-title>
    <p>Paper content</p>
</odcp-basic-page-template>
`
  }),
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithPageAddButton: Story = {
  render: (args) => ({
    template: `
<odcp-basic-page-template>
    <odcp-page-title pageHeader>Page title</odcp-page-title>
    <odcp-page-subtitle pageHeader style="margin-left: 1rem;">Page subtitle</odcp-page-subtitle>
    <odcp-page-add-button pageHeader [buttonSetup]="{title: 'Add new', routerLink: ''}" style="margin-left: auto;"></odcp-page-add-button>

    <p nonPaperContent>Content without a background (e.g., filters)</p>

    <odcp-section-paper-title>Paper content title</odcp-section-paper-title>
    <p>Paper content</p>
</odcp-basic-page-template>
`
  }),
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithPageCreateMenu: Story = {
  render: (args) => ({
    template: `
<odcp-basic-page-template>
    <odcp-page-title pageHeader>Page title</odcp-page-title>
    <odcp-page-subtitle pageHeader style="margin-left: 1rem;">Page subtitle</odcp-page-subtitle>
    <odcp-page-create-menu pageHeader [buttonSetup]="{buttons: [{title: 'Add new entity', routerLink: '', tooltip: 'Create new entity link'}]}" style="margin-left: auto;"></odcp-page-create-menu>

    <p nonPaperContent>Content without a background (e.g., filters)</p>

    <odcp-section-paper-title>Paper content title</odcp-section-paper-title>
    <p>Paper content</p>
</odcp-basic-page-template>
`
  }),
};
