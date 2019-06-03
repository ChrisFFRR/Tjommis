import { Component, NgZone, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from "@angular/router";
import { TjommisHubService, ExternalUser, Lobby, HangoutEventMessage } from '../services/tjommis-hub.service';
import {Observable, interval} from 'rxjs';
import { async } from 'q';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})

export class LoadingPage implements OnInit {
  public totalUsers: number;
  public timeStart: Date = new Date();
  public timeRunning: number;
  public lobbyName: string = '';
  public members: ExternalUser[] = [];
  public quotes: string[] = ["I DECLARE....BANKRUPCTY - Michael Scott", "Livets harde skole","ppPPølserrr - Tangerudbakken","booyaahh!"];
  public randomQuote:string = '';

  constructor(
    public router: Router,
    public events: Events,
    public tjommisHub: TjommisHubService,
    public zone: NgZone
  ) {

    events.subscribe("joinroom", (data) => {
      this.router.navigateByUrl('/chat');
    });


    events.subscribe("hangoutevent", (eventArgs: HangoutEventMessage) => {
      console.log("hangoutevent", eventArgs);
      this.zone.run(() => {
        this.lobbyName = eventArgs.room.lobbyName;
        this.totalUsers = eventArgs.totalUsers;
        this.timeRunning = eventArgs.timeRunning;
        this.members = eventArgs.room.members;
      });
    });

    events.subscribe("userjoin", (user: ExternalUser, lobby: Lobby) => {
      console.log("Join", user, lobby);
    });


    events.subscribe("lobbyinfo", (lobby: Lobby) => {
      console.log("lobbyinfo", lobby);
    });

  }

  ngOnInit() {
    if (this.tjommisHub.getConnectionState() == 0) {
      this.router.navigateByUrl("/login");
    }
    const quoteObservable = interval(3000);
 
    quoteObservable.subscribe((sequence: number) => {
      this.randomQuote = this.randomQuotes();
    });

  }

  randomQuotes() {
    var randomQuote = this.quotes[Math.floor(Math.random()*this.quotes.length)];
    return randomQuote;
  }
}
