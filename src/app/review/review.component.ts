import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { OrganizationService, HarvesterService, CropService, FarmService, EntryService, HarvestService, IEntryVm, ICropVm, IHarvesterVm, IHarvestVm } from '../swagger-api/index';
import * as _ from 'lodash';
import {Configuration, ConfigurationParameters} from "../swagger-api/configuration";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  token: string;
  harvest: IHarvestVm;

  constructor(
    public _activatedRoute:ActivatedRoute,
    private entryService: EntryService,
    private farmService: FarmService,
    private cropService: CropService,
    private harvesterService: HarvesterService,
    private organizationService: OrganizationService,
    private harvestService: HarvestService,
    private router: Router
  ) {
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

  harvestId:string;
  entries:any[];
  entryCrop:any[]=[];
  entryHarvester:any[]=[];
  crops: any[]=[];
  cropsList: ICropVm[];
  doneLoading:boolean=false;
  variety:any[]=[];
  priceTotal:number;
  pounds:number;
  cropSleceted:string;
  harvesters: any[];
  today:any[]=[];

  harvester:string;

  ngOnInit(): void {
    this.cropService.getAll().subscribe(
      (crops: Array<ICropVm>): void => {
        this.cropsList=crops;
        crops.forEach(c=>{
          this.crops.push({label:c.name,value:c._id})
        })

      },
      (error) => {
        console.log("error")
        console.log(error);
      }
    );

    this.harvesterService.getAll().subscribe(
      (harvesters: Array<IHarvesterVm>): void => {
        this.harvesters = [];
        harvesters.forEach((h) => {
          let temp = h.firstName + " " + h.lastName
          this.harvesters.push({label:temp,value:h._id});
        });
      },
      (error) => {
        console.log(error);
      }
    );

  this.harvestId= this._activatedRoute.snapshot.params['id'];
  console.log(this.harvestId)
  this.harvestService.getHarvestById(this.harvestId)
  .subscribe(data=>{
    this.entries = data.entries;
    console.log(this.entries)
    this.getEntryTime();
    this.getEntryCrop()
    this.getEntryHarvester()
  });
  }

  ngOnDestroy(): void {
    this.entryService.configuration.apiKeys["Authorization"] = null;
    this.farmService.configuration.apiKeys["Authorization"] = null;
    this.cropService.configuration.apiKeys["Authorization"] = null;
    this.harvesterService.configuration.apiKeys["Authorization"] = null;
    this.organizationService.configuration.apiKeys["Authorization"] = null;
    this.harvestService.configuration.apiKeys["Authorization"] = null;  }

  getEntryTime(){
    this.entries.forEach(e=>{
      this.today.push(e.createdOn)
       })
  }
  getEntryCrop(){
      this.entries.forEach(e=>{
     let temp= _.find(this.crops,{value:e.crop})
     this.entryCrop.push(temp)
      })
  }
  getEntryHarvester(){
    this.entries.forEach(e=>{
      console.log('test')
     let temp= _.find(this.harvesters,{value:e.harvester})
     this.entryHarvester.push(temp);
     console.log(this.entryHarvester)

    })
    console.log(this.entryHarvester)

    this.doneLoading=true;
  }

  calcPrice(){
    let pricePerPound;
    let res = _.findIndex(this.cropsList,{_id:this.cropSleceted});
    pricePerPound = this.cropsList[res].pricePerPound;
    console.log(this.pounds,pricePerPound)
    this.priceTotal = pricePerPound * this.pounds
  }
  filterVar(){
 this.variety=[];
    let cropName = _.filter(this.crops,{value:this.cropSleceted})
   let res=_.filter(this.cropsList, {name:cropName[0].label});
    res.forEach(v=>{
      if(v.variety.length>1){
        v.variety.forEach(vv =>{
          this.variety.push({label:vv,value:vv})
        })
      }else{
        this.variety.push({label:v.variety,value:v.variety})

      }
    })
  }


}
