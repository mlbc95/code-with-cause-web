import {Component, OnInit} from '@angular/core';
import {INewFarmParams} from '../../app.api';

@Component({
  selector: 'app-create-farm-dialog',
  templateUrl: 'create-farm-dialog.component.html',
  styleUrls: ['./create-farm-dialog.component.scss']
})
export class CreateFarmDialogComponent implements OnInit {
  farm: INewFarmParams;

  constructor() {
  }

  ngOnInit(): void {
    this.farm = new INewFarmParams({name: '', lat: 0, lng: 0});
  }
}
