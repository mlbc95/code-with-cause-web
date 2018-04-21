import { WeightOrValue, PercentageReportResponse } from './../app.api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'; 
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {GenerateReportDialogComponent} from './generate-report-dialog/generate-report-dialog.component';
import 'rxjs/add/operator/filter';
import {ReportingClient, PercentageType} from '../app.api';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, OnDestroy {
  token: string;
  donatedPerc:any;
  purchPerc:any;
  data: any;

  constructor(private matDialog: MatDialog,
              private reportingService: ReportingClient) {
                this.data = {
                  labels: ['A','B','C'],
                  datasets: [
                      {
                          data: [300, 50, 100],
                          backgroundColor: [
                              "#FF6384",
                              "#36A2EB",
                              "#FFCE56"
                          ],
                          hoverBackgroundColor: [
                              "#FF6384",
                              "#36A2EB",
                              "#FFCE56"
                          ]
                      }]    
                  };
                
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    // reportingService.configuration = new Configuration({
    //   apiKeys: {
    //     Authorization: this.token
    //   }
    // });
  }

  ngOnInit(): void {
    Observable.forkJoin(
      this.reportingService.getSalesPercentage(PercentageType.Donated),
      this.reportingService.getSalesPercentage(PercentageType.Purchased),
      // this.reportingService.getTotalWeightOrValue(WeightOrValue.Value),
      // this.reportingService.getTotalWeightOrValue(WeightOrValue.Weight),
    ).subscribe(([donated, purchased]: [PercentageReportResponse, PercentageReportResponse])=>{
      this.donatedPerc = donated.percentage;
      this.purchPerc = purchased.percentage;

    })
  
  }

  ngOnDestroy(): void {
    // this.reportingService.configuration.apiKeys['Authorization'] = null;
  }

  // generateNewReport(): void {
  //   const dialogRef = this.matDialog.open(
  //     GenerateReportDialogComponent,
  //     {
  //       width: '90vw'
  //     }
  //   );

  //   dialogRef.afterClosed()
  //     .filter(data => !!data)
  //     .subscribe(
  //       (reportType: string): void => {
  //         console.log(reportType)

  //         switch(reportType){
  //           case 'donated':
  //           this.
  //         }
  //         // if (reportType === 'donated' || reportType === 'purchased') {
  //         //   this.reportingService.getSalesPercentage(reportType)
  //         //     .sub
  //         // }

  //         // if (reportType) {
  //         //   switch (reportType) {
  //         //     case 'donated': {
  //         //       this.reportingService.getSalesPercentage('donated').subscribe(
  //         //         (a: any): void => {
  //         //           console.log(a);
  //         //         }
  //         //       );
  //         //     }
  //         //       break;
  //         //     case 'purchased': {
  //         //       this.reportingService.getSalesPercentage('purchased').subscribe(
  //         //         (a: any): void => {
  //         //           console.log(a);
  //         //         }
  //         //       );
  //         //     }
  //         //       break;
  //         //     case 'weight': {
  //         //       this.reportingService.getTotalWeightOrValue('weight').subscribe(
  //         //         (a: any): void => {
  //         //           console.log(a);
  //         //         }
  //         //       );
  //         //     }
  //         //       break;
  //         //     case 'value': {
  //         //       this.reportingService.getTotalWeightOrValue('value').subscribe(
  //         //         (a: any): void => {
  //         //           console.log(a);
  //         //         }
  //         //       );
  //         //     }
  //         //       break;
  //         //     default: {
  //         //       console.error('Unrecognized report type provided: \"' + reportType + '\"');
  //         //     }
  //         //       break;
  //         //   }
  //         // }
  //       }
  //     );
  // }
}
