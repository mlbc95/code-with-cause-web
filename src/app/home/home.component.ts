import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {CropVm, SystemClient, UserClient} from '../app.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  windowWidth: number = window.innerWidth;
  isAdmin: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private systemClient: SystemClient,
              private userClient: UserClient) {
    const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    this.isAdmin = currentUser.admin;
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

  importClick() {
    this.systemClient.importCrops()
      .subscribe((crops: CropVm[]) => {
        console.log(crops);
      }, (error: any) => {
        console.log(error);
      });
  }

  onFileChanged(event) {
    this.userClient.addImage({
      data: event.target.files[0],
      fileName: event.target.files[0].name
    })
      .subscribe(() => {
        console.log('Blah');
      });
  }
}
