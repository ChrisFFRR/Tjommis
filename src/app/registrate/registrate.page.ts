import { Component,NgZone, OnInit } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
})
export class RegistratePage implements OnInit {
    public statusMessage: string = "";
    displayError: boolean = false;

    username: string = "test";
    lastName: string = "test";
    password: string = "test";
    email: string = "test";
    Institutt: string[] = ["Kristiania", "Skole 2", "Skole 3"];
    selectedInstitutt: string;
    Studie: string[] = ["Studie 1", "Studie 2", "Studie 3"];
    selectedStudie: string;
    constructor(public  authService:  AuthServiceService) {

    }

    ngOnInit() {
    }

    register() {
        fetch(this.authService.endPoint + '/api/RegisterUser', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.username,
            })
          })
          .then(_ => {})
          .catch(_=> {
            console.log("Could not create user ");
            });


        /*register(form){
           fetch('https://smidigprosjekt.azurewebsites.net/RegisterUser', {
             method: 'post',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
               name: this.name,
               lastName: this.lastName,
               password: this.password,
               email: this.email,
               Institutt: this.Institutt,
               Studie: this.Studie
             })
           })
       }
       */
    }

}




