import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'odcp-side-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatDrawer,
    MatIcon,
    MatSidenavModule,
    MatTooltipModule,
    TranslateModule
  ],
  template: `
    <mat-sidenav-container #sidenavContainer>
      <mat-sidenav #sidenav [autoFocus]="false" position="end" fixedInViewport="true" fixedTopGap="0"
                  class="custom-sidebar-nav-width">
        <div class="action-container">
          <mat-icon
            (click)="onClose()"
            [matTooltip]="'CLOSE' | translate"
            class="pointer close-help-button"
            >close</mat-icon>
        </div>
        <ng-content></ng-content>
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styles: `
    /* Material gives the container z-index: 1, the same as raised-button labels, so later page content painted over the panel. */
    mat-sidenav-container {
      position: relative;
      z-index: 1000;
    }

    .action-container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      background-color: $primary-dc;
      z-index: 10000;
    }
  `
})
export class SidePanelComponent implements AfterViewInit, OnDestroy {

  public dcSidedrawerRef: any;

  @ViewChild('sidenavContainer', { read: ElementRef }) sidenavContainer!: ElementRef<HTMLElement>;
  @ViewChild('sidenav', { static: true }) set contentSidenav(content: any) {
    this.dcSidedrawerRef = content;
  }

  public get dcSideDrawer(): MatDrawer {
    return this.dcSidedrawerRef;
  }

  private movedWrapper: Element | null = null;

  ngOnDestroy(): void {
    this.dcSideDrawer?.close();
    this.restoreWrapper();
  }

  ngAfterViewInit(): void {
    const sidenav = this.sidenavContainer?.nativeElement;
    const wrapper = document.querySelector('div.wrapper');
    const parent = wrapper?.parentNode;

    // Host application may not provide a `div.wrapper` (or it may already be relocated).
    if (!sidenav || !wrapper || !parent || sidenav.contains(wrapper)) {
      return;
    }

    parent.insertBefore(sidenav, wrapper);
    sidenav.appendChild(wrapper);
    this.movedWrapper = wrapper;
  }

  private restoreWrapper(): void {
    const sidenav = this.sidenavContainer?.nativeElement as HTMLElement | undefined;
    const wrapper = this.movedWrapper;
    this.movedWrapper = null;
    if (!sidenav || !wrapper) {
      return;
    }
    if (sidenav.isConnected) {
      sidenav.parentNode?.insertBefore(wrapper, sidenav);
    }
    sidenav.remove();
  }

  openDrawer() {
    this.dcSideDrawer.open();
  }

  onClose() {
    this.dcSideDrawer.close();
  }

}
