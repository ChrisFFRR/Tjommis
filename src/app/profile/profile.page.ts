import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Events} from "@ionic/angular";
import {TjommisHubService} from "../services/tjommis-hub.service";
import anime from 'animejs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
      public router: Router,
      public tjommisHub: TjommisHubService,
      public events: Events,
      private zone: NgZone) {



    this.events.subscribe('randomNumber', (data) => {
      this.onUpdateRandomNumber(data);
    });

    this.events.subscribe('connectedusers', (data) => {
      this.onUpdateConnectedUsers(data);
    });
    this.events.subscribe('username', (data) => {
      this.onUpdateUsername(data);
    });
  }

  username: string = this.tjommisHub.connectionInfo ? this.tjommisHub.connectionInfo.userInfo.username : null;
  randomNumber: number = 0;
  connectedUsers: number = 0;

  onUpdateRandomNumber = number => {
    this.zone.run(() => {
      this.randomNumber = number;
    });
  };

  onUpdateConnectedUsers = number => {
    this.zone.run(() => {
      this.connectedUsers = number;
    });
  };

  onUpdateUsername = username => {
    this.zone.run(() => {
      this.username = username;
    });
  };

  ngOnInit() {
    if (this.tjommisHub.getConnectionState() == 0) {
      this.router.navigateByUrl("/login");
    } 
  }

  interesser() {
    this.router.navigateByUrl('/interesser')
  }

  chat() {
    /*
    var returnvalue = this.tjommisHub.Hangout();
    console.log("Moving to loading??",returnvalue);
    if (returnvalue == true) {
      this.router.navigateByUrl('/loading');
    }*/
    this.tjommisHub.Hangout().then(e => {
      if (e) this.router.navigateByUrl('/loading');
    })
    //
  }

  settings() {
    this.router.navigateByUrl('/settings')
  }

  animateClick() {
    anime({
      targets: 'chatWrapper',
      translateY: [
        {value: 0, duration: 1200},
        {value: -200, duration: 800},
      ],
      duration: 2000,
      complete: () => {this.chat()}
    });
  }
}