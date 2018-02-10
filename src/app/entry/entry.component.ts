import { Component, OnInit } from '@angular/core';
import {Crop, Entry, Harvest, Organization} from "../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  today: string;
  harvestStarted: boolean;

  // dropdown lists
  organizations: Organization[];
  crops: Crop[];
  harvesters: string[];

  harvestForm: FormGroup;
  harvest: Harvest;
  currentEntry: Entry;

  tempCrops: Crop[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tempCrops = [];
    let tempTomato = new Crop();
    tempTomato.name = 'tomato';
    tempTomato.variety = [];
    tempTomato.variety.push('San Marzano Lungo');
    tempTomato.variety.push('Michael Pollan');
    tempTomato.pricePerPound = '4.50';
    this.tempCrops.push(tempTomato);
    let tempCarrot = new Crop();
    tempCarrot.name = "carrot";
    tempCarrot.variety = [];
    tempCarrot.variety.push("kniff");
    tempCarrot.pricePerPound = "2.50";
    this.tempCrops.push(tempCarrot);

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
