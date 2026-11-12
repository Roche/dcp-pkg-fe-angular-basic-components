import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {CreateMenuSetupModel, PageCreateMenuComponent} from '../../lib/pages/page-create-menu/page-create-menu.component';

@Component({
  selector: 'odcp-page-create-menu-disabled-demo-story',
  standalone: true,
  imports: [PageCreateMenuComponent],
  template: `
    <div #container style="display: flex; justify-content: flex-end; width: 100%;">
      <odcp-page-create-menu [buttonSetup]="buttonSetup" [disabled]="disabled"></odcp-page-create-menu>
    </div>
  `,
})
class PageCreateMenuDisabledDemoStoryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', {read: ElementRef}) container?: ElementRef<HTMLElement>;

  disabled = false;
  buttonSetup: CreateMenuSetupModel = {
    buttons: [
      {title: 'Create invoice', tooltip: 'Create invoice'},
      {title: 'Create customer', tooltip: 'Create customer'},
    ],
  };

  private timeouts: number[] = [];

  ngAfterViewInit(): void {
    this.timeouts.push(
      window.setTimeout(() => {
        const toggleButton = this.container?.nativeElement.querySelector<HTMLButtonElement>(
          '.page-create-menu_button-show-extra',
        );
        toggleButton?.click();
      }, 2000),
    );

    this.timeouts.push(
      window.setTimeout(() => {
        this.disabled = true;
      }, 4000),
    );
  }

  ngOnDestroy(): void {
    this.timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
  }
}

const meta: Meta<PageCreateMenuDisabledDemoStoryComponent> = {
  title: 'Buttons/Page create menu',
  component: PageCreateMenuDisabledDemoStoryComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          defaultLanguage: 'en',
        }),
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<PageCreateMenuDisabledDemoStoryComponent>;

export const DisabledAfterOpening: Story = {
  name: 'Open extra buttons then disable (2s + 2s)',
};
