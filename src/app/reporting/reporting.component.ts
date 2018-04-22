import {PercentageReportResponse, ReportByFarm, ValueReportResponse, WeightValueReportType} from './../app.api';
import * as _ from 'lodash';
import * as randomColor from 'randomcolor';
import 'rxjs/add/observable/forkJoin';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import 'rxjs/add/operator/filter';
import {PercentageByFarm, PercentageByFarmReportResponse, PercentageReportType, PercentageType, ReportingClient} from '../app.api';
import {forkJoin} from 'rxjs/observable/forkJoin';


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, OnDestroy {
  token: string;
  reportWeightParams: ReportByFarm = new ReportByFarm();
  reportValueParams: ReportByFarm = new ReportByFarm();
  reportDonatedParams: PercentageByFarm = new PercentageByFarm();
  reportPurchasedParams: PercentageByFarm = new PercentageByFarm();
  donatedPerc: any;
  purchPerc: any;
  farmValue: any;
  farmWeight: any;
  farmLabels: any;
  data: any;
  selected: string;
  renderChart = false;
  totalValue: any;
  totalWeight: any;
  orgTypeData: any[];
  orgTypeReport = false;
  poundsByDonated: any;
  poundsByPurchased: any;
  priceByDonated: any;
  priceByPurchased: any;
  percentagePoundsByDonated: any;
  percentagePoundsByPurchased: any;
  percentagePriceByDonated: any;
  percentagePriceByPurchased: any;

  constructor(private matDialog: MatDialog,
              private reportingService: ReportingClient) {
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
  }

  ngOnInit(): void {
    this.reportWeightParams.valueReportType = WeightValueReportType.Weight;
    this.reportValueParams.valueReportType = WeightValueReportType.Value;
    this.reportDonatedParams.reportType = PercentageReportType.Donated;
    this.reportPurchasedParams.reportType = PercentageReportType.Purchased;

    forkJoin(
      this.reportingService.getSalesPercentage(PercentageType.Donated),
      this.reportingService.getSalesPercentage(PercentageType.Purchased),
      this.reportingService.getTotalWeightOrValue(this.reportWeightParams),
      this.reportingService.getTotalWeightOrValue(this.reportValueParams),
      this.reportingService.getPercentageByFarm(this.reportDonatedParams),
      this.reportingService.getPercentageByFarm(this.reportPurchasedParams)
    )
      .subscribe(
        ([donated, purchased, weight, value, donatedByFarm, purchasedByFarm]:
           [PercentageReportResponse, PercentageReportResponse, ValueReportResponse[],
             ValueReportResponse[], PercentageByFarmReportResponse[], PercentageByFarmReportResponse[]]) => {

          this.donatedPerc = donated.percentage;
          this.purchPerc = purchased.percentage;
          this.farmValue = _.map(value, 'value');
          this.farmWeight = _.map(weight, 'value');
          this.farmLabels = _.map(value, 'farmName');

          this.poundsByDonated = _.map(donatedByFarm, 'pounds');
          this.priceByDonated = _.map(donatedByFarm, 'total');
          this.percentagePoundsByDonated = _.map(donatedByFarm, 'percentageByPound');
          this.percentagePriceByDonated = _.map(donatedByFarm, 'percentageByPrice');

          this.poundsByPurchased = _.map(purchasedByFarm, 'pounds');
          this.priceByPurchased = _.map(purchasedByFarm, 'total');
          this.percentagePoundsByPurchased = _.map(purchasedByFarm, 'percentageByPound');
          this.percentagePriceByPurchased = _.map(purchasedByFarm, 'percentageByPrice');

          this.totalValue = _.reduce(this.farmValue, (sum, n) => {
            return sum + n;
          }, 0);

          this.totalWeight = _.reduce(this.farmWeight, (sum, n) => {
            return sum + n;
          }, 0);


        });
  }

  ngOnDestroy(): void {
    // this.reportingService.configuration.apiKeys['Authorization'] = null;
  }

  onFilterChange($event): void {

    const bgColor = randomColor({
      count: this.farmLabels.length,
    });

    if (this.selected === 'Value') {
      this.data = {
        labels: this.farmLabels,
        datasets: [
          {
            data: this.farmValue,
            backgroundColor: bgColor,
            hoverBackgroundColor: bgColor
          }]
      };
    } else if (this.selected === 'Weight') {
      this.data = {
        labels: this.farmLabels,
        datasets: [
          {
            data: this.farmWeight,
            backgroundColor: bgColor,
            hoverBackgroundColor: bgColor
          }]
      };
    } else if (this.selected === 'Donated') {
      this.orgTypeData = [];
      const data1 = {
        labels: this.farmLabels,
        datasets: [
          {
            data: this.poundsByDonated,
            backgroundColor: randomColor({
              count: this.farmLabels.length,
            }),
            hoverBackgroundColor: randomColor({
              count: this.farmLabels.length,
              hue: 'random'
            })
          }
        ]
      };

      const option1 = {
        title: {
          display: true,
          text: 'Pounds total Donated by Farms',
          fontSize: 16
        }
      };

      const data2 = {
        labels: this.farmLabels,
        datasets: [
          {
            data: this.priceByDonated,
            backgroundColor: randomColor({
              count: this.farmLabels.length,
            }),
            hoverBackgroundColor: randomColor({
              count: this.farmLabels.length,
              hue: 'random'
            })
          }
        ]
      };

      const option2 = {
        title: {
          display: true,
          text: 'Amount total Donated by Farms',
          fontSize: 16
        }
      };

      const data3 = {
        labels: this.farmLabels,
        datasets: [
          {
            data: this.percentagePoundsByDonated,
            backgroundColor: randomColor({
              count: this.farmLabels.length
            }),
            hoverBackgroundColor: randomColor({
              count: this.farmLabels.length,
              hue: 'random'
            })
          }
        ]
      };

      const option3 = {
        title: {
          display: true,
          text: 'Pounds percentage Donated by Farms',
          fontSize: 16
        }
      };

      const data4 = {
        labels: this.farmLabels,
        datasets: [
          {
            data: this.percentagePriceByDonated,
            backgroundColor: randomColor({
              count: this.farmLabels.length
            }),
            hoverBackgroundColor: randomColor({
              count: this.farmLabels.length,
              hue: 'random'
            })
          }
        ]
      };

      const option4 = {
        title: {
          display: true,
          text: 'Amount percentage Donated by Farms',
          fontSize: 16
        }
      };

      this.orgTypeData.push(
        {data: data1, option: option1},
        {data: data2, option: option2},
        {data: data3, option: option3},
        {data: data4, option: option4});
      this.orgTypeReport = true;
    } else if (this.selected === 'Purchased') {
      this.orgTypeData = [];
      const data1 = {
        labels: this.farmLabels,
        datasets: [
          {
            data: this.poundsByPurchased,
            backgroundColor: randomColor({
              count: this.farmLabels.length,
            }),
            hoverBackgroundColor: randomColor({
              count: this.farmLabels.length,
              hue: 'random'
            })
          }
        ]
      };

      const option1 = {
        title: {
          display: true,
          text: 'Pounds total Purchased by Farms',
          fontSize: 16
        }
      };

      const data2 = {
        labels: this.farmLabels,
        datasets: [
          {
            data: this.priceByPurchased,
            backgroundColor: randomColor({
              count: this.farmLabels.length,
            }),
            hoverBackgroundColor: randomColor({
              count: this.farmLabels.length,
              hue: 'random'
            })
          }
        ]
      };

      const option2 = {
        title: {
          display: true,
          text: 'Amount total Purchased by Farms',
          fontSize: 16
        }
      };

      const data3 = {
        labels: this.farmLabels,
        datasets: [
          {
            data: this.percentagePoundsByPurchased,
            backgroundColor: randomColor({
              count: this.farmLabels.length
            }),
            hoverBackgroundColor: randomColor({
              count: this.farmLabels.length,
              hue: 'random'
            })
          }
        ]
      };

      const option3 = {
        title: {
          display: true,
          text: 'Pounds percentage Purchased by Farms',
          fontSize: 16
        }
      };

      const data4 = {
        labels: this.farmLabels,
        datasets: [
          {
            data: this.percentagePriceByPurchased,
            backgroundColor: randomColor({
              count: this.farmLabels.length
            }),
            hoverBackgroundColor: randomColor({
              count: this.farmLabels.length,
              hue: 'random'
            })
          }
        ]
      };

      const option4 = {
        title: {
          display: true,
          text: 'Amount percentage Purchased by Farms',
          fontSize: 16
        }
      };

      this.orgTypeData.push(
        {data: data1, option: option1},
        {data: data2, option: option2},
        {data: data3, option: option3},
        {data: data4, option: option4});
      this.orgTypeReport = true;
    }

    this.renderChart = true;

  }
}
