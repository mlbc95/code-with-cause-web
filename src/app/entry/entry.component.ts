import {Component, OnInit} from '@angular/core';
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
import {IHarvestVm} from "../swagger-api/model/iHarvestVm";
import {IEntryVm} from "../swagger-api/model/iEntryVm";
import {EntryService} from "../swagger-api/api/entry.service";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  today: string;
  harvestStarted: boolean;
  editMode: boolean;

  // dropdown lists
  farms: IFarmVm[];
  organizations: IOrganizationVm[];
  crops: ICropVm[];
  harvesters: string[];

  harvest: IHarvestVm;
  currentEntry: IEntryVm;

  varieties: string[];

  constructor(private entryService: EntryService,
              private farmService: FarmService,
              private cropService: CropService,
              private harvesterService: HarvesterService,
              private organizationService: OrganizationService,
              private harvestService: HarvestService) {
  }

  ngOnInit() {
    let storedHarvest = JSON.parse(localStorage.getItem('harvest_id'));
    if(storedHarvest){
      this.harvestService.getHarvestById(newHarvest).subscribe((harvest) => {
        this.harvest = harvest;
      });
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
    this.harvest.entries = [];
  }

  startHarvest() {
    this.harvestService.registerHarvest(this.harvest).subscribe((harvest) => {
      this.harvest = harvest;
    });

    let newEntry = {'crop': null, 'pounds': 0, 'priceTotal': 0, 'harvester': null, 'comments': '', 'recipient': null};
    this.entryService.registerEntry(newEntry).subscribe(
      (entry: IEntryVm): void => {
        this.currentEntry = entry;
      },
      (error) => {
        console.log(error);
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

  submitEntry() {
    this.harvest.entries.push(this.currentEntry);
    this.currentEntry = {
      'crop': null,
      'pounds': 0,
      'priceTotal': 0,
      'harvester': null,
      'comments': '',
      'recipient': null
    };
    //save whole harvest to local storage in case of browser refresh
    localStorage.setItem('harvest', JSON.stringify({
      harvest: this.harvest
    }));
    console.log(this.harvest);
  }

  submitHarvest() {
    this.submitEntry();
    // go to review page which shows all entries, each with an edit button
  }

  sendHarvest() {

    // clear this harvest from local storage
    localStorage.removeItem('harvest');
    this.harvestStarted = false;
  }

  backAnEntry() {
    this.currentEntry = this.harvest.entries[this.entryIndex];
    console.log(this.currentEntry);
  }

  goToEntry() {

  }

}
