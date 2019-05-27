import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TjommisHubService, HangoutEventMessage, Message} from "../services/tjommis-hub.service";
import {Events} from "@ionic/angular";
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message: string;
  public messages: Message[] = this.tjommisHub.activeRoom.messages;

  constructor(
      public router: Router,
      public tjommisHub: TjommisHubService,
      public events: Events,
      private zone: NgZone
  ) {
    events.subscribe("message",(lobby: string, message: Message) => {
      console.log("Chat message received:" , lobby, message);
      this.onAddMessage();
    });
  }

  private onAddMessage = () => {
    this.zone.run(() => {
      this.messages = this.tjommisHub.activeRoom.messages;
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
