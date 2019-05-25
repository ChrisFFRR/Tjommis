import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@aspnet/signalr';
import {Events} from '@ionic/angular';
import {AuthServiceService} from "../services/auth-service.service";
import { connect } from 'tls';

@Injectable({
  providedIn: 'root'
})

export class TjommisHubService {
    private hubConnection: HubConnection;
    //public username: string;
    public connectionInfo : ConnectionInfo; 
    public connectedusers: number;
    public randomNumber: number;
    public authenticated: boolean;
    public messages: string[] = ['Messages:'];
    public connected = this.hubConnection != null ? this.hubConnection.state == HubConnectionState.Connected : false;
    public getConnectionState() {
        return this.hubConnection != null ? this.hubConnection.state : 0;
    }
    //public state : HubConnectionState = this.hubConnection == null ? 2 : this.hubConnection.state;

    constructor(public events: Events,
        public authService: AuthServiceService,) {}


    SendMessage(message) {
        this.hubConnection.send('SendMessage', message);
    }
    Hangout()  {
        return this.hubConnection.invoke('TestHangout');
    }

    // Connect method for SignalR
    // Returns: Promise(resolve, reject)
    connect(accesstoken) {
        return new Promise((resolve, reject) => {
            // If allready connected from earlier sessions, disconnect and reconnect
            if (this.hubConnection != null) { this.hubConnection.stop(); }

            // Create a new hub and connect it using accessToken from earlier
            this.hubConnection = new HubConnectionBuilder().
             withUrl(this.authService.endPoint + '/tjommisHub',{accessTokenFactory: () => accesstoken}).build();

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
        hubConnection.on('infoConnectEvent', (connectioninfo: ConnectionInfo) => {
            console.log('infoConncetEvent', connectioninfo);
            this.connectionInfo = connectioninfo;
            this.events.publish('username', connectioninfo.userInfo.username);
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
        hubConnection.on('joinroom',(room: Lobby) => {
            this.events.publish('joinroom',room);
        });
        hubConnection.on('userjoin',(user: ExternalUser, lobby : Lobby) => {
            this.events.publish('userjoin',user,lobby);
        });
        hubConnection.on('lobbyinfo',(room: Lobby) => {
            this.events.publish('lobbyinfo',room);
        });
        hubConnection.on('hangoutevent',(eventArgs : HangoutEventMessage) => {
            this.events.publish('hangoutevent',eventArgs);
        });
    }
}
export class User {
    username : string;
    lobbies : Lobby[];
}
export class InterestItem {
    id : number;
    category : string;
    name : string;
}
export class ConnectionInfo {
    userInfo : User;
    interestList : InterestItem[];
}
export class ExternalUser {
    username : string;
    lastname : string;
}
export class Message {
    messagetype : string;
    username : string;
    message: string;
    timestamp : Date;
}
export class Lobby {
    public lobbyname : string;
    public members : ExternalUser[];
    public messages : Message[];
}

export class HangoutEventMessage {
    public timeStamp : Date;
    public totalUsers : number
}
