import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(
    public router: Router,
    public events: Events
    ) { 
    
   events.subscribe("joinRoom",(data) => {
      this.router.navigateByUrl('/chat');
    });
  }

  ngOnInit() {
  }

}
