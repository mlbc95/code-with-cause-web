import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-farm-management',
  templateUrl: './farm-management.component.html',
  styleUrls: ['./farm-management.component.scss']
})
export class FarmManagementComponent implements OnInit {
  farms: Array<any> = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}
