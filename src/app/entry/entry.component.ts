import { Component, OnInit } from '@angular/core';
import {Crop, Entry, Harvest} from "../model";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  today: string;
  harvestStarted: boolean;
  harvest: Harvest;
  currentEntry: Entry;

  tempCrops: Crop[];

  constructor() { }

  ngOnInit() {
    this.tempCrops = [];
    let tempTomato = new Crop();
    tempTomato.name = 'tomato';
    tempTomato.variety = 'San Marzano Lungo';
    tempTomato.pricePerPound = '4.50';
    this.tempCrops.push(tempTomato);
    let tempTomato2 = new Crop();
    tempTomato2.name = 'tomato';
    tempTomato2.variety = "Michael Pollan";
    tempTomato2.pricePerPound = '4.50';
    this.tempCrops.push(tempTomato2);
    let tempCarrot = new Crop();
    tempCarrot.name = "carrot";
    tempCarrot.variety = "kniff";
    tempCarrot.pricePerPound = "2.50";
    this.tempCrops.push(tempCarrot);

    this.today = new Date().toLocaleDateString();
    this.harvestStarted = false;
    this.harvest = new Harvest();
    this.currentEntry = new Entry();
  }

  startHarvest(){
    this.harvestStarted = true;
  }

  buildForm(){

  }

}
