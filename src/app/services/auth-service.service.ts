import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";


const apiUrl = '/token';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {  
    //public endPoint : string = "https://smidigprosjekt.azurewebsites.net";
    public endPoint : string = "https://localhost:5001";
    public loginToken: string;
    constructor(public http: Http) {}

    login(credentials) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            const data = 'username=' + credentials.username +
                '&password=' + encodeURIComponent(credentials.password) +
                '&grant_type=password&client_id=tjommisdemo2018_signing_key_that_should_be_very_long';

            // Send
            this.http.post(apiUrl, data, {headers})
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
            const headers = new Headers();
            headers.append('X-Auth-Token', localStorage.getItem('token'));

            this.http.post(apiUrl + 'logout', {}, {headers})
                .subscribe(res => {
                    localStorage.clear();
                }, (err) => {
                    reject(err);
                });
        });
    }
}
