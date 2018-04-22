import {Component, OnInit} from '@angular/core';
import {HarvestClient, HarvestVm} from '../app.api';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {Angular5Csv} from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-harvest-edit',
  templateUrl: './harvest-edit.component.html',
  styleUrls: ['./harvest-edit.component.scss']
})
export class HarvestEditComponent implements OnInit {
  harvests: HarvestVm[];
  doneLoading = false;
  csvData: any;
  csvFilename: string;
  csvHeaders: any;
  form: FormGroup;


  constructor(
    private harvestService: HarvestClient,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.harvestService.getAll().subscribe(data => {
      this.harvests = data;
      this.resolveHarvestDataCsv(data);
      this.doneLoading = true;
    });

  }

  private resolveHarvestDataCsv(harvests: HarvestVm[]) {
    this.csvData = [];
    harvests.forEach(harvest => {
      harvest.entries.forEach(entry => {
        this.csvData.push({
          farm_name: harvest.farm.name,
          crop: entry.crop.name,
          harvester: entry.harvester.firstName + entry.harvester.lastName,
          recipient: entry.recipient.name,
          created_on: moment(entry.createdOn).format('YYYY-MM-DD'),
          updated_on: moment(entry.updatedOn).format('YYYY-MM-DD'),
          selected_variety: entry.selectedVariety,
          pounds: entry.pounds,
          price_total: entry.priceTotal,
          comments: entry.comments
        });
      });
    });
    this.csvFilename = `Harvests_${moment().format('YYYY-MM-DD')}`;
    this.csvHeaders = Object.keys(this.csvData[0]);
  }

  downloadCsv() {
    const options = {
      showLabels: true,
      showTitle: true,
      title: this.csvFilename,
      headers: this.csvHeaders
    };
    new Angular5Csv(this.csvData, this.csvFilename, options);
  }

  routeToEditEntry(harvest, entryIndex) {
    console.log(entryIndex);
    this.router.navigate([`/edit-entry/${harvest._id}/${entryIndex}`]);
  }

  routeToViewEntry(harvest) {
    console.log(harvest);
    this.router.navigate([`/review-harvest/${harvest._id}`]);

  }

}
