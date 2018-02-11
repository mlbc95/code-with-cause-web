import { Component, OnInit } from '@angular/core';
import {Crop, Entry, Farm, Harvest, Organization} from "../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FarmService} from "../swagger-api/api/farm.service";
import {IFarmVm} from "../swagger-api/model/iFarmVm";

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
  organizations: Organization[];
  crops: Crop[];
  harvesters: string[];

  harvestForm: FormGroup;
  harvest: Harvest;
  currentEntry: Entry;

  tempCrops: Crop[];

  constructor(private formBuilder: FormBuilder,
              private farmService: FarmService
  ) { }

  ngOnInit() {
    this.farmService.getAll().subscribe(
      (farms: Array<IFarmVm>): void => {
        this.farms = farms;
      },
    (error) => {
        console.error(error);
      }
    );

    this.today = new Date().toLocaleDateString();
    this.harvestStarted = false;
    this.harvest = new Harvest();
    this.currentEntry = new Entry();
  }

  startHarvest(){
    this.harvestStarted = true;

    // check if there's a harvest saved in local storage, if there is recover it

  }

  buildForm(){

  }

  submitEntry(){
    //save whole harvest to local storage in case of browser refresh
  }

}
