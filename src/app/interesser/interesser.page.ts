import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {TjommisHubService, InterestItem} from "../services/tjommis-hub.service";


@Component({
  selector: 'app-interesser',
  templateUrl: './interesser.page.html',
  styleUrls: ['./interesser.page.scss'],
})
export class InteresserPage implements OnInit {
  data:Observable<any>;
  items:any;
  url:string;


  public tags: any[] = [];
  public selectedTags: any[] = [];
  public tjommisHub: any = TjommisHubService;


  constructor(public router: Router) {
      this.getData();
  }


  getData()
  {
        this.items = [
            {"title": "Gaming",
                 "tag": ["#PS4", "#XBOX", "#PC","#LoL", "#Dota2", "#WoW"]
            },
            {"title": "Skole",
                "tag":["#Kollokvie", "#Eksamen", "#Tips", "Events","#Skolebøker",]
            },
            {"title": "Idrett",
                "tag": ["#Fotball", "#Vektløfting", "#Løping", "#Speedwalking", "#Basketball"]
            },
            {"title": "Teknologi",
                "tag": ["#Programmering", "#Windows", "#Linux", "#IT","#Java", "#Javascript"]
            },
            {"title": "Mat",
                "tag": ["#Schnitzler", "#Pizza", "#Kebab", "#Øl","#Sprit", "#Vin"]
            } ,
            {"title": "Musikk",
                "tag": ["#Pop", "#Rock", "#Rap", "#Metall","#Techno", "#RnB", "Vapourwave"]
            },
            {"title": "Litteratur",
                "tag": ["#Alf Prøysen", "#J.K Rowling", "#R.R Tolkien", "#Dan Abnett"]
            },
            {"title": "Jobb",
                "tag": ["#CV", "#Internship", "#Jobbsøknad", "#Konferanser", "#Workshops"]
            },
            {"title": "Fest",
                "tag": ["#Vorspiel", "#Nachspiel", "#Hjemmefest", "#Låvefest", "#Alkoholfritt"]
            },
            ]
  }


  tagClicked(tagBtn) {

  };

  addTag(tag) {
    this.selectedTags.includes(tag) ? console.log("tag already selected") : this.selectedTags.push(tag);
    console.log(this.selectedTags);
  }

  ngOnInit() {
  }
}
