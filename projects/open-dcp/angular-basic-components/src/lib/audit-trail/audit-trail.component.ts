import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { uiStore } from '@open-dcp/services';
import { lastValueFrom } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ODCPRequestService } from '../dc-request.service';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import moment from 'moment-timezone';

export interface AuditTrailModel {
  RecordId: string;
  UserIdValue: number;
  SiteId: number;
  Table: string;
  Field: string;
  OldValue: any;
  NewValue: string;
  Timestamp: string;
  ActionType: string;
  UserName: string;
  Reason: string;
  timestampAsDate?: string;
}

export enum ActionEnum {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

@Component({
  selector: 'odcp-audit-trail',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatDrawer,
    MatIcon,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTooltipModule,
    TranslateModule
  ],
  template: `
    <div class="odcp-audit-trail-manager p-3">
      <div class="header p-3">
        <span class="pl-0">
          {{ titleText | translate }}
        </span>
        <div class="action-container">
          <mat-icon
            *ngIf="allowDownloadCsv"
            (click)="downloadCsv()"
            [matTooltip]="downloadCsvText | translate"
            class="pointer">file_download</mat-icon>
        </div>
      </div>

      <div class="audit-trail-list">
        <div
          class="loading-indicator-container mt-5 full-width"
          *ngIf="!auditTrail?.length && requestingAuditTrail">
          <mat-spinner diameter="32"></mat-spinner>
        </div>

        <div
          *ngFor="let audit of auditTrail"
          class="audit-trail-item mb-3 full-width">
          <div class="audit-trail-header full-width">
            <span class="username-action-container">
              <mat-chip-set class="mr-3">
                <mat-chip class="audit-color-{{ audit?.ActionType?.toLowerCase() }}">
                  {{audit?.ActionType?.toLowerCase()}}
                </mat-chip>
              </mat-chip-set>
              <span>
                {{ audit?.UserName }}
              </span>
            </span>

            <span>{{ audit?.timestampAsDate }}</span>
          </div>

          <div class="audit-trail-info full-width">
            <span
              class="mt-1 mb-1"
              *ngIf="audit?.ActionType?.toLowerCase() === actionEnum.Create"
              [innerHTML]="
                'AUDIT_TRAIL_DESCRIPTION_CREATE'
                  | translate
                    : {
                        field: audit?.Field,
                        newValue: audit?.NewValue || (audit?.NewValue === null ? 'NULL' : (audit?.NewValue === '' ? 'EMPTY' : '')),
                        table: audit?.Table
                      }
              "
            >
            </span>

            <span
              class="mt-1 mb-1"
              *ngIf="audit?.ActionType?.toLowerCase() === actionEnum.Update"
              [innerHTML]="
                'AUDIT_TRAIL_DESCRIPTION_UPDATE'
                  | translate
                    : {
                        field: audit?.Field,
                        oldValue: audit?.OldValue || (audit?.OldValue === null ? 'NULL' : (audit?.OldValue === '' ? 'EMPTY' : '')),
                        newValue: audit?.NewValue || '',
                        table: audit?.Table
                      }
              "
            >
            </span>

            <span
              class="mt-1 mb-1"
              *ngIf="audit?.ActionType?.toLowerCase() === actionEnum.Delete"
              [innerHTML]="
                (audit?.OldValue !== null &&
                audit?.OldValue !== undefined &&
                audit?.OldValue !== ''
                  ? 'AUDIT_TRAIL_DESCRIPTION_DELETE'
                  : 'AUDIT_TRAIL_DESCRIPTION_DELETE_NO_VALUE'
                )
                  | translate
                    : {
                        field: audit?.Field,
                        oldValue: audit?.OldValue || (audit?.OldValue === null ? 'NULL' : (audit?.OldValue === '' ? 'EMPTY' : '')),
                        table: audit?.Table
                      }
              "
            ></span>

            <span class="mt-1 mb-2 reason-text">{{ audit?.Reason }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .odcp-audit-trail-manager {
      .audit-trail-list {
        margin-top: 40px !important;
      }
    }
  `
})
export class AuditTrailComponent implements OnChanges {
  @Input() titleText: string = 'Audit Trail';

  @Input() downloadCsvText: string = 'Download CSV';

  @Input() allowDownloadCsv: boolean = false;

  @Input() endPoint!: string;

  @Input() fileName!: string;

  requestingAuditTrail = false;

  auditTrail: AuditTrailModel[] = [];

  actionEnum = ActionEnum;

  dcRequestService: ODCPRequestService;

  constructor(
    _http: HttpClient,
    private readonly translate: TranslateService,
  ) {
    this.dcRequestService = new ODCPRequestService(_http);

    this.translate.setTranslation('en', {
      "AUDIT_TRAIL": "Audit Trail",
      "AUDIT_TRAIL_DESCRIPTION": "User {{user}} has {{action}} field {{field}} {{oldValue}} {{newValue}}",
      "AUDIT_TRAIL_DESCRIPTION_CREATE": "Field <b>{{field}}</b> in table <b>{{table}}</b> created with a value of <b>{{newValue}}</b>",
      "AUDIT_TRAIL_DESCRIPTION_UPDATE": "Field <b>{{field}}</b> in table <b>{{table}}</b> updated from <b>{{oldValue}}</b> to <b>{{newValue}}</b>",
      "AUDIT_TRAIL_DESCRIPTION_DELETE": "Field <b>{{field}}</b> with a value of <b>{{oldValue}}</b> removed from table <b>{{table}}</b>",
      "AUDIT_TRAIL_DESCRIPTION_DELETE_NO_VALUE": "Field <b>{{field}}</b> removed from table <b>{{table}}</b>"
    }, true);

    this.translate.setTranslation('de', {
      "AUDIT_TRAIL": "Audit Trail",
      "AUDIT_TRAIL_DESCRIPTION": "Benutzer {{user}} hat Feld {{field}} {{action}} {{oldValue}} {{newValue}}",
      "AUDIT_TRAIL_DESCRIPTION_CREATE": "Feld <b>{{field}}</b> in Tabelle <b>{{table}}</b> mit Wert <b>{{newValue}}</b> erstellt",
      "AUDIT_TRAIL_DESCRIPTION_UPDATE": "Feld <b>{{field}}</b> in Tabelle <b>{{table}}</b> von <b>{{oldValue}}</b> auf <b>{{newValue}}</b> aktualisiert",
      "AUDIT_TRAIL_DESCRIPTION_DELETE": "Feld <b>{{field}}</b> mit Wert <b>{{oldValue}}</b> aus Tabelle <b>{{table}}</b> entfernt",
      "AUDIT_TRAIL_DESCRIPTION_DELETE_NO_VALUE": "Field <b>{{field}}</b> removed from table <b>{{table}}</b>"
    }, true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['endPoint']) {
      this.getAuditTrail();
    }
  }

  private getAuditTrail() {
    this.requestingAuditTrail = true;
    uiStore.setLoading(this.endPoint);
    lastValueFrom(this.dcRequestService.getData(this.endPoint)).then((res) => {
      const timeZone = uiStore.getState().site.timeZone ?? 'UTC';
      this.auditTrail = res.map((item: AuditTrailModel) => {
        const timestampAsDate = moment(moment(item.Timestamp).toISOString())
                                      .tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
        return {
          ...item,
          timestampAsDate
        }
      });
    }).finally(() => {
      uiStore.removeLoading(this.endPoint);
      this.requestingAuditTrail = false;
    });
  }

  private escapeCsvValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }

    const resultString = String(value);
    if (/[",\n\r]/.test(resultString)) {
      return `"${resultString.replace(/"/g, '""')}"`;
    }
    return resultString;
  }

  downloadCsv() {
    if (this.auditTrail?.length === 0) {
      return;
    }

    const columns: (keyof AuditTrailModel)[] = [
      "RecordId",
      "UserName",
      "timestampAsDate",
      // "Timestamp",
      "ActionType",
      "SiteId",
      "Table",
      "Field",
      "OldValue",
      "NewValue",
      "Reason"
    ]

    const tableHeaders = [
      "Record Id",
      "User Id",
      "Timestamp",
      "Action",
      "Site Id",
      "Table",
      "Field",
      "Old Value",
      "New Value",
      "Reason"
    ];

    const rows = this.auditTrail.map((row: AuditTrailModel) =>
                  columns.map(column => this.escapeCsvValue(row[column])).join(","));
    // "sep=," forces Excel to use ',' regardless of the OS list separator (e.g. ';' in many EU locales)
    const combinedRows = [tableHeaders.join(","), ...rows].join("\r\n");
    const blob = new Blob([combinedRows], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

}
