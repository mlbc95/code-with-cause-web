import { Component, OnInit } from '@angular/core';
import {Crop, Entry, Farm, Harvest, Organization} from "../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FarmService} from "../swagger-api/api/farm.service";
import {IFarmVm} from "../swagger-api/model/iFarmVm";
import {CropService} from "../swagger-api/api/crop.service";
import {HarvesterService} from "../swagger-api/api/harvester.service";
import {OrganizationService} from "../swagger-api/api/organization.service";
import {ICropVm} from "../swagger-api/model/iCropVm";
import {IOrganizationVm} from "../swagger-api/model/iOrganizationVm";
import {IHarvesterVm} from "../swagger-api/model/iHarvesterVm";
import {IEntryVm} from "../swagger-api/model/iEntryVm";
import {IHarvestVm} from "../swagger-api/model/iHarvestVm";
import {INewEntryParams} from "../swagger-api/model/iNewEntryParams";
import {INewHarvestParams} from "../swagger-api/model/iNewHarvestParams";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  today: string;
  harvestStarted: boolean;

  // dropdown lists
  farms: IFarmVm[];
  organizations: IOrganizationVm[];
  crops: ICropVm[];
  harvesters: string[];

  harvestForm: FormGroup;
  harvest: INewHarvestParams;
  currentEntry: INewEntryParams;

  tempCrops: Crop[];

  constructor(private farmService: FarmService,
              private cropService: CropService,
              private harvesterService: HarvesterService,
              private organizationService: OrganizationService,
  ) { }

  ngOnInit() {
    let storedHarvest = JSON.parse(localStorage.getItem('harvest'));
    if(storedHarvest){
      this.harvest = storedHarvest;
    }

    this.farmService.getAll().subscribe(
      (farms: Array<IFarmVm>): void => {
        this.farms = farms;
      },
    (error) => {
        console.error(error);
      }
    );
    // this.cropService.getAll().subscribe(
    //   (crops: Array<ICropVm>): void => {
    //     this.crops = crops;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    this.harvesterService.getAll().subscribe(
      (harvesters: Array<IHarvesterVm>): void => {
        this.harvesters = [];
        harvesters.forEach((harvester) => {
          this.harvesters.push(harvester.firstName + " " + harvester.lastName);
        });
      },
      (error) => {
        console.log(error);
      }
    );

    this.today = new Date().toLocaleDateString();
    this.harvestStarted = false;
    this.harvest = {'farm':null, 'entries':null};
    this.currentEntry = {'crop':null, 'pounds':0, 'priceTotal':0, 'harvester':null, 'comments':'', 'recipient':null};
  }

  startHarvest(){
    this.harvestStarted = true;

  }

  submitEntry(){
    this.harvest.entries.push(this.currentEntry);
    this.currentEntry = {'crop':null, 'pounds':0, 'priceTotal':0, 'harvester':null, 'comments':'', 'recipient':null};
    //save whole harvest to local storage in case of browser refresh
    localStorage.setItem('harvest', JSON.stringify({
      harvest: this.harvest
    }));
  }

  submitHarvest(){

    // clear this harvest from local storage
    localStorage.removeItem('harvest');
  }

}
