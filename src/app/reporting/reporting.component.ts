import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {GenerateReportDialogComponent} from './generate-report-dialog/generate-report-dialog.component';
import 'rxjs/add/operator/filter';
import {ReportingClient} from '../app.api';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, OnDestroy {
  token: string;

  constructor(private matDialog: MatDialog,
              private reportingService: ReportingClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    // reportingService.configuration = new Configuration({
    //   apiKeys: {
    //     Authorization: this.token
    //   }
    // });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.reportingService.configuration.apiKeys['Authorization'] = null;
  }

  generateNewReport(): void {
    const dialogRef = this.matDialog.open(
      GenerateReportDialogComponent,
      {
        width: '90vw'
      }
    );

    dialogRef.afterClosed()
      .filter(data => !!data)
      .subscribe(
        (reportType: string): void => {
          // if (reportType === 'donated' || reportType === 'purchased') {
          //   this.reportingService.getSalesPercentage(reportType)
          //     .sub
          // }

          // if (reportType) {
          //   switch (reportType) {
          //     case 'donated': {
          //       this.reportingService.getSalesPercentage('donated').subscribe(
          //         (a: any): void => {
          //           console.log(a);
          //         }
          //       );
          //     }
          //       break;
          //     case 'purchased': {
          //       this.reportingService.getSalesPercentage('purchased').subscribe(
          //         (a: any): void => {
          //           console.log(a);
          //         }
          //       );
          //     }
          //       break;
          //     case 'weight': {
          //       this.reportingService.getTotalWeightOrValue('weight').subscribe(
          //         (a: any): void => {
          //           console.log(a);
          //         }
          //       );
          //     }
          //       break;
          //     case 'value': {
          //       this.reportingService.getTotalWeightOrValue('value').subscribe(
          //         (a: any): void => {
          //           console.log(a);
          //         }
          //       );
          //     }
          //       break;
          //     default: {
          //       console.error('Unrecognized report type provided: \"' + reportType + '\"');
          //     }
          //       break;
          //   }
          // }
        }
      );
  }
}
