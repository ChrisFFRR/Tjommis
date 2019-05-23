import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Events} from "@ionic/angular";
import {TjommisHubService} from "../services/tjommis-hub.service";

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

  username: string = this.tjommisHub.username;
  randomNumber: number;
  connectedUsers: number;

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

  }

  interesser() {
    this.router.navigateByUrl('/interesser')
  }

  chat() {
    this.router.navigateByUrl('/chat')
    this.tjommisHub.Hangout();
  }

  settings() {
    this.router.navigateByUrl('/settings')
  }
}
