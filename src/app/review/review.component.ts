import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  CropService, EntryService, FarmService, HarvesterService, HarvestService, ICropVm, IEntryVm, IHarvesterVm, IHarvestVm,
  OrganizationService
} from '../swagger-api/index';
import * as _ from 'lodash';
import {Configuration, ConfigurationParameters} from '../swagger-api/configuration';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  token: string;
  harvest: IHarvestVm;

  constructor(public _activatedRoute: ActivatedRoute,
              private entryService: EntryService,
              private farmService: FarmService,
              private cropService: CropService,
              private harvesterService: HarvesterService,
              private organizationService: OrganizationService,
              private harvestService: HarvestService,
              private router: Router) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    const config: ConfigurationParameters = {
      apiKeys: {
        Authorization: this.token
      }
    };
    entryService.configuration = new Configuration(config);
    farmService.configuration = new Configuration(config);
    cropService.configuration = new Configuration(config);
    harvesterService.configuration = new Configuration(config);
    organizationService.configuration = new Configuration(config);
    harvestService.configuration = new Configuration(config);
  }

  harvestId: string;
  entries: IEntryVm[];
  entryCrop: any[] = [];
  entryHarvester: any[] = [];
  crops: ICropVm[] = [];
  cropsList: ICropVm[];
  doneLoading = false;
  variety: any[] = [];
  priceTotal: number;
  pounds: number;
  cropSleceted: string;
  harvesters: IHarvesterVm[];
  today: any[] = [];

  harvester: string;

  ngOnInit(): void {

    // Get Crops and Harvesters
    Observable
      .combineLatest(
        this.cropService.getAll(),
        this.harvesterService.getAll()
      )
      .subscribe((data: [ICropVm[], IHarvesterVm[]]) => {
        const [crops, harvesters] = data;
        this.crops = crops;
        this.harvesters = harvesters;
      }, (error: HttpErrorResponse) => {
        console.log('Error', error);
      });

    this.harvestId = this._activatedRoute.snapshot.params['id'];
    this.harvestService.getHarvestById(this.harvestId)
      .subscribe((data: IHarvestVm) => {
        this.entries = data.entries;
        this.getEntryTime();
        this.getEntryCrop();
        this.getEntryHarvester();
      });
  }

  ngOnDestroy(): void {
    this.entryService.configuration.apiKeys['Authorization'] = null;
    this.farmService.configuration.apiKeys['Authorization'] = null;
    this.cropService.configuration.apiKeys['Authorization'] = null;
    this.harvesterService.configuration.apiKeys['Authorization'] = null;
    this.organizationService.configuration.apiKeys['Authorization'] = null;
    this.harvestService.configuration.apiKeys['Authorization'] = null;
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
