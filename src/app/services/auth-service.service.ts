import { Injectable } from '@angular/core';
//import {Headers, Http} from '@angular/http';
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";


const apiUrl = '/token';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {  
    public endPoint : string = "https://smidigprosjekt.azurewebsites.net";
    //public endPoint : string = "https://localhost:5001";
    public loginToken: string;
    constructor(public http: HttpClient) {}

    login(credentials) {
        return new Promise((resolve, reject) => {
            const  headers = new  HttpHeaders().set("Content-Type", "application/json");
            var loginData = { 
                username:credentials.username,
                password:encodeURIComponent(credentials.password),
                grant_type:"password",
                clientid:"tjommisdemo2018_signing_key_that_should_be_very_long"
            };

            this.http.post<any>(apiUrl, loginData,{headers})
                .subscribe(res => {
                    if (res.status === 200) {
                        console.log(res);
                        this.loginToken = res.json().access_token;
                        return resolve(this.loginToken);

                    } else {
                        console.log('Unknown error', res);
                        return reject(res.json().error);
                    }
                }, (err) => {
                    return reject(err.json().error);
                });
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders().set('X-Auth-Token', localStorage.getItem('token'));
            this.http.post(apiUrl + 'logout', {}, {headers})
                .subscribe(res => {
                    localStorage.clear();
                }, (err) => {
                    reject(err);
                });
        });
    }
}
