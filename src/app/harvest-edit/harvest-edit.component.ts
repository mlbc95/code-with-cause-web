import { Component, OnInit } from '@angular/core';
import { HarvestClient, HarvestVm } from '../app.api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-harvest-edit',
  templateUrl: './harvest-edit.component.html',
  styleUrls: ['./harvest-edit.component.scss']
})
export class HarvestEditComponent implements OnInit {
  harvests: HarvestVm[];
  doneLoading = false;

  form: FormGroup;
  
  
  constructor(
    private harvestService: HarvestClient,
    private fb: FormBuilder,
    private router: Router,    
  ) { }

  ngOnInit() {
    this.harvestService.getAll().subscribe(data=>{
      this.harvests = data;
      console.log(data);
      this.doneLoading = true;
    })
    
  }
  routeToEditEntry(harvest,entryIndex){
    console.log(entryIndex)
    this.router.navigate([`/edit-entry/${harvest._id}/${entryIndex}`]);
  }
  routeToViewEntry(harvest){
    console.log(harvest)
    this.router.navigate([`/review-harvest/${harvest._id}`]);
    
  }

}
