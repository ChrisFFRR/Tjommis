import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TjommisHubService} from "../services/tjommis-hub.service";
import {Events} from "@ionic/angular";
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message: string;
  public messages: string[] = this.tjommisHub.messages;

  constructor(
      public router: Router,
      public tjommisHub: TjommisHubService,
      public events: Events,
      private zone: NgZone
  ) {
    events.subscribe("message",(data) => {
      this.onAddMessage(data);
    });
  }

  private onAddMessage = message => {
    this.zone.run(() => {
      this.messages = this.tjommisHub.messages;
    })
  };

  handleSendMessage() {
    this.tjommisHub.SendMessage(this.message);
    this.message = "";
  }

  toHome() {
    this.router.navigateByUrl('/profile')
  }

  ngOnInit() {
    if (this.tjommisHub.getConnectionState() == 0) this.router.navigateByUrl('/login');
  }

}
