import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-interesser',
  templateUrl: './interesser.page.html',
  styleUrls: ['./interesser.page.scss'],
})
export class InteresserPage implements OnInit {

  public tags: any[] = [];
  public selectedTags: any[] = [];


  skole = ["#eksamen", "#kollokvie", "#bachelor","#master", "#brukerundersøkelse", "#fadderuke"];
  teknologi = ["#ps4", "#xbox", "#switch", "#mobil","#hardware", "#software","#mac","#windows", "#data"];
  idrett = ["#fotball", "#basketball", "#extremsport", "håndball","#ski","#BMX","#Skateboard",];
  kultur = ["#teater", "#kino", "#film", "#festival", "#litteratur", "#kunst", "#musikk"];
  jobb = ["#jobbsøknad", "#internship", "#lønn", "#personutvikling","#deltidsjobb", "#opplæring"];
  matdrikke = ["#resturant", "#øl", "#vin", "#sprit", "#julebord", "#kjøtt", "#fisk", "#bacon"];


  constructor(public router: Router) {
  }
  btnActivate(ionicButton) {
    ionicButton._color === 'dark' ? ionicButton.color = 'primary' : ionicButton.color = 'dark';
  };
  btnTags(ionicButton) {
    ionicButton._color === 'light' ? ionicButton.color = 'primary' : ionicButton.color = 'light';
  };

  selectTags(tag) {
    this.selectedTags.includes(tag) ? console.log("tag already selected") : this.selectedTags.push(tag);
  }

  toMain() {
    this.router.navigateByUrl('/profile');
  }
  ngOnInit() {
  }

}
