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

    this.events.subscribe('connectedusers', (data) => {
      this.onUpdateConnectedUsers(data);
    });
    this.events.subscribe('username', (data) => {
      console.log("Profile.OnUpdateUserName",data);
      this.onUpdateUsername(data);
    });
  }

  username: string = this.tjommisHub.connectionInfo ? this.tjommisHub.connectionInfo.userInfo.username : null;
  connectedUsers: number = 0;


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
      translateY: '10vh',
      duration: 300,
      direction: 'alternate',
      easing: 'easeInCubic',
      scaleX: {
        value: 1.05,
        duration: 150,
        delay: 268
      },
      complete: () => {this.chat()}
    });
  }
  
}