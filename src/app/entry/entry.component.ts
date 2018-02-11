import {Component, OnInit} from '@angular/core';
import {FarmService} from "../swagger-api/api/farm.service";
import {IFarmVm} from "../swagger-api/model/iFarmVm";
import {CropService} from "../swagger-api/api/crop.service";
import {HarvesterService} from "../swagger-api/api/harvester.service";
import {OrganizationService} from "../swagger-api/api/organization.service";
import {ICropVm} from "../swagger-api/model/iCropVm";
import {IOrganizationVm} from "../swagger-api/model/iOrganizationVm";
import {IHarvesterVm} from "../swagger-api/model/iHarvesterVm";
import {HarvestService} from "../swagger-api/api/harvest.service";
import {IHarvestVm} from "../swagger-api/model/iHarvestVm";
import {IEntryVm} from "../swagger-api/model/iEntryVm";
import {EntryService} from "../swagger-api/api/entry.service";
import {IHarvestParams} from "../swagger-api/model/iHarvestParams";
import {INewEntryParams} from "../swagger-api/model/iNewEntryParams";
import {IHarvestParams} from "../swagger-api/model/iHarvestParams";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  token: string;
  today: string;
  harvestStarted: boolean;
  editMode: boolean;

  // dropdown lists
  farms: IFarmVm[];
  organizations: IOrganizationVm[];
  crops: ICropVm[];
  harvesters: string[];

  selectedFarm: IFarmVm;
  harvest: IHarvestVm;
  currentEntry: IEntryVm;

  varieties: string[];

  constructor(private entryService: EntryService,
              private farmService: FarmService,
              private cropService: CropService,
              private harvesterService: HarvesterService,
              private organizationService: OrganizationService,
              private harvestService: HarvestService) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
  }

  ngOnInit() {
    let storedHarvestID = JSON.parse(localStorage.getItem('harvest_id'));
    if(storedHarvestID){
      this.harvestService.getHarvestById(storedHarvestID).subscribe((harvest) => {
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
        console.log(this.crops);
      },
      (error) => {
        console.log(error);
      }
    );

    this.today = new Date().toLocaleDateString();
    this.harvestStarted = false;
    this.editMode = false;
  }

  startHarvest() {
    let newHarvest: IHarvestParams = {'farm': this.selectedFarm._id};
    this.harvestService.registerHarvest(newHarvest).subscribe((harvest) => {
      this.harvest = harvest;
      this.harvest.entries = [];
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
      },
      (error) => {
        console.log(error);
      });

    //this.currentEntry = {'crop': this.currentEntry.crop, 'pounds': 0, 'priceTotal': 0, 'harvester': this.currentEntry.harvester, 'comments': '', 'recipient': this.currentEntry.recipient};

  }

  submitEntry() {
    // this.harvest.entries.push(this.currentEntry);
    let newEntry = {'crop': null, 'pounds': 0, 'priceTotal': 0, 'harvester': null, 'comments': '', 'recipient': null};
    this.entryService.registerEntry(newEntry).subscribe(
      (entry: IEntryVm): void => {
        this.currentEntry = entry;
      },
      (error) => {
        console.log(error);
      });
    //save whole harvest to local storage in case of browser refresh
    localStorage.setItem('harvest_id', JSON.stringify({
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
    localStorage.removeItem('harvest_id');
    this.harvestStarted = false;
  }

  backAnEntry() {
    console.log(this.currentEntry);
  }

  goToEntry() {

  }

}
