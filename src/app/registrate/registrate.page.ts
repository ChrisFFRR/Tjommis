import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
})
export class RegistratePage implements OnInit {
    public statusMessage: string = "";
    displayError: boolean = false;
    public loginFormGroup: FormGroup;

    name: String = "test";
    lastName: String = "test";
    password: String = "test";
    email: String = "test";
    Institutt: String = "test";
    Studie: String = "test";

    constructor(public  authService:  AuthServiceService) {

    }

    ngOnInit() {
    }

    register(form) {
        fetch(this.authService.endPoint + '/api/RegisterUser', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.name,
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




