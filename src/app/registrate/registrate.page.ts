import { Component, NgZone, OnInit } from '@angular/core';
import { AuthServiceService } from "../services/auth-service.service";
import { TjommisHubService } from "../services/tjommis-hub.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
})
export class RegistratePage implements OnInit {
  public statusMessage: string = "";
  displayError: boolean = false;

  username: string = "";
  lastName: string = "";
  password: string = "";
  email: string = "";
  Institutt: string[] = ["Kristiania", "Skole 2", "Skole 3"];
  selectedInstitutt: string;
  Studie: string[] = ["Studie 1", "Studie 2", "Studie 3"];
  selectedStudie: string;

  constructor(
    public router: Router,
    public authService: AuthServiceService,
    public tjommisHub: TjommisHubService) {

  }

  ngOnInit() {
  }

  register() {
    fetch(this.authService.endPoint + '/api/RegisterUser', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.username,
        lastname: this.lastName,
        password: this.password,
        email: this.email,
        Institutt: this.selectedInstitutt,
        selectedStudie: this.selectedStudie
      })
    })
      .then(_ => {
        //Sign in metode fra authservice
        this.authService.login({ username: this.username, password: this.password })
          .then(response => {
            this.statusMessage = "Logging inn...";
            this.tjommisHub.connect(this.authService.loginToken).then(
              () => {
                this.statusMessage = "";
                this.router.navigateByUrl('/profile');
              },
              rejected => {
                console.log("Could not connect: ", rejected)
              }
            );
          },
            rejectedResponse => {
              console.log("Rejected:", rejectedResponse);
              this.displayError = true;
              this.statusMessage = rejectedResponse;
            });

      })
      .catch(_ => {
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




