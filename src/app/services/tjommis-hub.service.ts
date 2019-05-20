import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {Events} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TjommisHubService {
    private hubConnection: HubConnection;
    public username: string;
    public connectedusers: number;
    public randomNumber: number;
    public authenticated: boolean;
    public messages: string[] = ['Messages:'];
    constructor(public events: Events) {}


    SendMessage(message) {
        this.hubConnection.send('SendMessage', message);
    }

    // Connect method for SignalR
    // Returns: Promise(resolve, reject)
    connect(accesstoken) {
        return new Promise((resolve, reject) => {
            // If allready connected from earlier sessions, disconnect and reconnect
            if (this.hubConnection != null) { this.hubConnection.stop(); }

            // Create a new hub and connect it using accessToken from earlier
            this.hubConnection = new HubConnectionBuilder().
            withUrl('https://smidigprosjekt.azurewebsites.net/tjommisHub', {accessTokenFactory: () => accesstoken}).build();
            // withUrl('https://localhost:5001/tjommisHub',{accessTokenFactory: () => accesstoken}).build();

            // Register the callback functions (Maybe do this on component load)
            // Possibly let the components register the events directly to SignalR themselves,
            // for now we are using ionics Event system
            this.registerSignalRCallbacks(this.hubConnection);

            // Start connect and return value
            this.hubConnection
                .start()
                .then(() => resolve(true))
                .catch(() => reject('Error while establishing connection :('));
        });
    }

    registerSignalRCallbacks(hubConnection) {
        hubConnection.on('messageBroadcastEvent', (user: string, message: string) => {
            const fullmessage = user + '> ' + message;
            this.messages.push(fullmessage);
            this.events.publish('message', fullmessage);
            console.log('message: ', message, 'user:', user);
        });
        hubConnection.on('infoConnectEvent', (username: string) => {
            this.username = username;
            this.events.publish('username', username);
            console.log('username', username);
        });
        hubConnection.on('infoGlobalEvent', (connectedusers: number) => {
            this.connectedusers = connectedusers;
            this.events.publish('connectedusers', connectedusers);
            console.log('connectedusers:', connectedusers);
        });
        hubConnection.on('updateGuiTestEvent', (randomNumber: number) => {
            this.randomNumber = randomNumber;
            this.events.publish('randomNumber', randomNumber);
            console.log('randomNumber:', randomNumber);
        });
    }

}
