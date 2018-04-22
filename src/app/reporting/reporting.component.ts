import { PercentageReportResponse, ValueReportResponse, WeightValueReportType, ReportByFarm } from './../app.api';
import * as _ from 'lodash';
import * as randomColor from 'randomColor';
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
  reportWeightParams: ReportByFarm = new ReportByFarm();
  reportValueParams: ReportByFarm = new ReportByFarm();
  donatedPerc:any;
  purchPerc:any;
  farmValue:any;
  farmWeight:any;
  farmLabels:any;
  data: any;
  selected:string;
  renderChart:boolean = false;
  totalValue:any;
  totalWeight:any;

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
  }

  ngOnInit(): void {
    this.reportWeightParams.valueReportType = WeightValueReportType.Weight;
    this.reportValueParams.valueReportType= WeightValueReportType.Value;
    Observable.forkJoin(
      this.reportingService.getSalesPercentage(PercentageType.Donated),
      this.reportingService.getSalesPercentage(PercentageType.Purchased),
      this.reportingService.getTotalWeightOrValue(this.reportWeightParams),
       this.reportingService.getTotalWeightOrValue(this.reportValueParams),
    ).subscribe(([donated, purchased,weight,value]: [PercentageReportResponse, PercentageReportResponse,ValueReportResponse[],ValueReportResponse[]])=>{ 

      this.donatedPerc = donated.percentage; 
      this.purchPerc = purchased.percentage;
      this.farmValue = _.map(value,'value');
      this.farmWeight = _.map(weight,'value');
      this. farmLabels= _.map(value,'farmName');
      this.totalValue = _.reduce(this.farmValue,(sum,n)=>{
        return sum+n
      },0)

      this.totalWeight = _.reduce(this.farmWeight,(sum,n)=>{
        return sum+n
      },0)
      
      
    })
  }

  ngOnDestroy(): void {
    // this.reportingService.configuration.apiKeys['Authorization'] = null;
  }
  onFilterChange($event):void{

    const bgColor = randomColor({
      count: this.farmLabels.length,
   });

   if(this.selected == 'Value'){
    this.data = {
      labels: this.farmLabels,
      datasets: [
          {
              data: this.farmValue,
              backgroundColor: bgColor,
              hoverBackgroundColor: bgColor
          }]    
      };
   }else if(this.selected == 'Weight'){
    this.data = {
      labels: this.farmLabels,
      datasets: [
          {
              data: this.farmWeight,
              backgroundColor: bgColor,
              hoverBackgroundColor: bgColor
          }]    
      };
   }

   this.renderChart = true;

  }
}
