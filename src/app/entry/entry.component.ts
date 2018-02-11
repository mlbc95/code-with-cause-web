import {Component, OnInit} from '@angular/core';
import {FarmService} from '../swagger-api/api/farm.service';
import {IFarmVm} from '../swagger-api/model/iFarmVm';
import {CropService} from '../swagger-api/api/crop.service';
import {HarvesterService} from '../swagger-api/api/harvester.service';
import {OrganizationService} from '../swagger-api/api/organization.service';
import {ICropVm} from '../swagger-api/model/iCropVm';
import {IOrganizationVm} from '../swagger-api/model/iOrganizationVm';
import {IHarvesterVm} from '../swagger-api/model/iHarvesterVm';
import {HarvestService} from '../swagger-api/api/harvest.service';
import {IHarvestVm} from '../swagger-api/model/iHarvestVm';
import {IEntryVm} from '../swagger-api/model/iEntryVm';
import {EntryService} from '../swagger-api/api/entry.service';
import {IHarvestParams} from '../swagger-api/model/iHarvestParams';
import * as _ from 'lodash';
import {Message} from 'primeng/api';
import {Router} from '@angular/router';
import {Configuration, ConfigurationParameters} from "../swagger-api/configuration";
import {IUserVm, SystemService} from '../swagger-api';

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
  msgs: Message[] = [];

  // dropdown lists
  farms: any[] = [];
  organizations: any[] = [];
  crops: any[] = [];
  variety: any[] = [];
  users: any[];


  selectedFarm: IFarmVm;
  harvest: IHarvestVm;
  currentEntry: IEntryVm;
  cropsList: ICropVm[];

  harvester: string;
  cropSleceted: string;
  pounds: number;
  priceTotal: number;
  farm: string;
  recipent: string;
  selectedVar: string;
  selectedUser: string;
  selectedOrg: string;
  comment: string;

  doneLoading: boolean = false

  varieties: string[];

  entryIdArray: any[] = [];

  constructor(private entryService: EntryService,
              private farmService: FarmService,
              private cropService: CropService,
              private harvesterService: HarvesterService,
              private organizationService: OrganizationService,
              private harvestService: HarvestService,
              private systemService: SystemService,
              private router: Router) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    let config: ConfigurationParameters = {
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

  ngOnInit(): void {
    let storedHarvestID = JSON.parse(localStorage.getItem('harvest_id'));
    // if (storedHarvestID) {
    //   this.harvestService.getHarvestById(storedHarvestID).subscribe((harvest) => {
    //     this.harvest = harvest;
    //   });
    //}

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
        this.cropsList = crops;
        crops.forEach(c => {
          this.crops.push({label: c.name, value: c._id})
        })

        console.log(this.crops);
        this.doneLoading = true;
      },
      (error) => {
        console.log("error")
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
      console.log(harvest)
      this.harvest = harvest;
      this.harvest.entries = [];
      localStorage.setItem("harvest_id", JSON.stringify({
          harvest: this.harvest._id
        }
      ));
      this.harvestStarted = true;
    });

    this.systemService.getAllUsers().subscribe(
      (users: Array<IUserVm>): void => {
        this.users = [];
        users.forEach((u) => {
          this.users.push({label:u.username,value:u._id});
        })
      },
      (error) => {
        console.log(error);
      }
    );

    this.organizationService.getAll().subscribe(
      (organizations: Array<IOrganizationVm>): void => {
        organizations.forEach(o => {
          this.organizations.push({label: o.name, value: o._id})
        })
        console.log(organizations)
      },
      (error) => {
        console.log(error);
      });

  }

  submitEntry() {

    let newEntry = {'crop': this.cropSleceted, 'pounds': this.pounds, 'priceTotal': this.priceTotal, 'harvester': this.selectedUser, 'comments': this.comment, 'recipient': this.selectedOrg};
    this.entryService.registerEntry(newEntry).subscribe(
      (entry: IEntryVm): void => {
        console.log(entry);
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: 'Entry Saved! You\'re saving Trees'});
        this.entryIdArray.push(entry._id)
        localStorage.setItem('entry_id', JSON.stringify({
          entries: this.entryIdArray
        }));
      },
      (error) => {
        console.log(error);
      });

  }

  submitHarvest() {
    let harvestId = JSON.parse(localStorage.getItem('harvest_id'));
    let entryId = JSON.parse(localStorage.getItem('entry_id'))
    console.log(entryId.entries)
    console.log(harvestId.harvest)

    let harvestParams = {farm: this.selectedFarm._id, entries: entryId.entries, harvestId: harvestId.harvest}
    console.log(harvestParams)
    this.harvestService.registerHarvest(harvestParams)
      .subscribe(data => {
          this.router.navigate([`/review-harvest/${harvestId.harvest}`])
        },
        (error) => {
          console.log(error);
        });
    // go to review page which shows all entries, each with an edit button
  }

  calcPrice() {
    let pricePerPound;
    let res = _.findIndex(this.cropsList, {_id: this.cropSleceted});
    pricePerPound = this.cropsList[res].pricePerPound;
    console.log(this.pounds, pricePerPound)
    this.priceTotal = pricePerPound * this.pounds
  }

  filterVar() {
    this.variety = [];
    let cropName = _.filter(this.crops, {value: this.cropSleceted})
    let res = _.filter(this.cropsList, {name: cropName[0].label});
    res.forEach(v => {
      if (v.variety.length > 1) {
        v.variety.forEach(vv => {
          this.variety.push({label: vv, value: vv})
        })
      } else {
        this.variety.push({label: v.variety, value: v.variety})

      }
    })
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
