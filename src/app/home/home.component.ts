import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  windowWidth: number = window.innerWidth;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.windowWidth = window.innerWidth;
  }

  cardSelected(endpoint: string): void {
    this.router.navigate([endpoint]);
  }

  @HostListener('window:resize', ['$event'])
  resize(event: any) {
    this.windowWidth = window.innerWidth;
  }
}
