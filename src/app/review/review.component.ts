import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';
import {
  CropClient, CropVm, EntryClient, EntryVm, FarmClient, HarvestClient, HarvesterClient, HarvesterVm, HarvestVm,
  OrganizationClient
} from '../api';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  token: string;
  harvest: HarvestVm;

  constructor(public _activatedRoute: ActivatedRoute,
              private entryService: EntryClient,
              private farmService: FarmClient,
              private cropService: CropClient,
              private harvesterService: HarvesterClient,
              private organizationService: OrganizationClient,
              private harvestService: HarvestClient,
              private router: Router) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    // const config: ConfigurationParameters = {
    //   apiKeys: {
    //     Authorization: this.token
    //   }
    // };
    // entryService.configuration = new Configuration(config);
    // farmService.configuration = new Configuration(config);
    // cropService.configuration = new Configuration(config);
    // harvesterService.configuration = new Configuration(config);
    // organizationService.configuration = new Configuration(config);
    // harvestService.configuration = new Configuration(config);
  }

  harvestId: string;
  entries: EntryVm[];
  entryCrop: any[] = [];
  entryHarvester: any[] = [];
  crops: CropVm[] = [];
  cropsList: CropVm[];
  doneLoading = false;
  variety: any[] = [];
  priceTotal: number;
  pounds: number;
  cropSleceted: string;
  harvesters: HarvesterVm[];
  today: any[] = [];

  harvester: string;

  ngOnInit(): void {

    // Get Crops and Harvesters
    Observable
      .combineLatest(
        this.cropService.getAll(),
        this.harvesterService.getAll()
      )
      .subscribe((data: [CropVm[], HarvesterVm[]]) => {
        const [crops, harvesters] = data;
        this.crops = crops;
        this.harvesters = harvesters;
      }, (error: HttpErrorResponse) => {
        console.log('Error', error);
      });

    this.harvestId = this._activatedRoute.snapshot.params['id'];
    this.harvestService.getHarvestById(this.harvestId)
      .subscribe((data: HarvestVm) => {
        this.entries = data.entries;
        this.getEntryTime();
        this.getEntryCrop();
        this.getEntryHarvester();
      });
  }

  ngOnDestroy(): void {
    // this.entryService.configuration.apiKeys['Authorization'] = null;
    // this.farmService.configuration.apiKeys['Authorization'] = null;
    // this.cropService.configuration.apiKeys['Authorization'] = null;
    // this.harvesterService.configuration.apiKeys['Authorization'] = null;
    // this.organizationService.configuration.apiKeys['Authorization'] = null;
    // this.harvestService.configuration.apiKeys['Authorization'] = null;
  }

  getEntryTime() {
    this.entries.forEach(e => {
      this.today.push(e.createdOn);
    });
  }

  getEntryCrop() {
    this.entries.forEach(e => {
      const temp = _.find(this.crops, {value: e.crop});
      this.entryCrop.push(temp);
    });
  }

  getEntryHarvester() {
    this.entries.forEach(e => {
      console.log('test');
      const temp = _.find(this.harvesters, {value: e.harvester});
      this.entryHarvester.push(temp);
      console.log(this.entryHarvester);

    });
    console.log(this.entryHarvester);

    this.doneLoading = true;
  }

  // calcPrice() {
  //   let pricePerPound;
  //   const res = _.findIndex(this.cropsList, {_id: this.cropSleceted});
  //   pricePerPound = this.cropsList[res].pricePerPound;
  //   console.log(this.pounds, pricePerPound);
  //   this.priceTotal = pricePerPound * this.pounds;
  // }
  //
  // filterVar() {
  //   this.variety = [];
  //   const cropName = _.filter(this.crops, {value: this.cropSleceted});
  //   const res = _.filter(this.cropsList, {name: cropName[0].label});
  //   res.forEach(v => {
  //     if (v.variety.length > 1) {
  //       v.variety.forEach(vv => {
  //         this.variety.push({label: vv, value: vv});
  //       });
  //     } else {
  //       this.variety.push({label: v.variety, value: v.variety});
  //
  //     }
  //   });
  // }


}
