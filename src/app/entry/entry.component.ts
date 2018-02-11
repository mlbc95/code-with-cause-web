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
import {INewEntryParams} from "../swagger-api/model/iNewEntryParams";
import {INewHarvestParams} from "../swagger-api/model/iNewHarvestParams";
import {HarvestService} from "../swagger-api/api/harvest.service";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  today: string;
  harvestStarted: boolean;
  editMode: boolean;
  entryIndex: number;

  // dropdown lists
  farms: IFarmVm[];
  organizations: IOrganizationVm[];
  crops: ICropVm[];
  harvesters: string[];

  harvest: INewHarvestParams;
  currentEntry: INewEntryParams;

  varieties: string[];

  constructor(private farmService: FarmService,
              private cropService: CropService,
              private harvesterService: HarvesterService,
              private organizationService: OrganizationService,
              private harvestService: HarvestService) { }

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
    this.cropService.getAll().subscribe(
      (crops: Array<ICropVm>): void => {
        this.crops = crops;
      },
      (error) => {
        console.log(error);
      }
    );
    this.today = new Date().toLocaleDateString();
    this.harvestStarted = false;
    this.editMode = false;
    this.entryIndex = 0;
    this.harvest.entries = [];
    this.currentEntry = {'crop':null, 'pounds':0, 'priceTotal':0, 'harvester':null, 'comments':'', 'recipient':null};
  }

  onCropChanged(event) {
    const cropId = event.value;
    this.currentEntry.crop = cropId;
    this.varieties = this.crops.filter(c => c._id === cropId)[0].variety;
  }

  startHarvest(){
    this.harvestService.registerHarvest().subscribe((harvest) => {

    });
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
    this.organizationService.getAll().subscribe(
      (organizations: Array<IOrganizationVm>): void => {
        this.organizations = organizations;
        this.harvestStarted = true;
      },
      (error) => {
        console.log(error);
      });
  }

  submitEntry(){
    this.harvest.entries.push(this.currentEntry);
    this.currentEntry = {'crop':null, 'pounds':0, 'priceTotal':0, 'harvester':null, 'comments':'', 'recipient':null};
    this.entryIndex++;
    //save whole harvest to local storage in case of browser refresh
    localStorage.setItem('harvest', JSON.stringify({
      harvest: this.harvest
    }));
    console.log(this.harvest);
  }

  submitHarvest(){
    this.submitEntry();
    // go to review page which shows all entries, each with an edit button
  }

  sendHarvest(){

    // clear this harvest from local storage
    localStorage.removeItem('harvest');
    this.harvestStarted = false;
  }

  backAnEntry(){
    this.entryIndex--;
    this.currentEntry = this.harvest.entries[this.entryIndex];
    console.log(this.currentEntry);
  }

  goToEntry(){

  }

}
