import { Injectable } from "@angular/core";
import {io} from 'socket.io-client/build/index';
import {Observable} from 'rxjs';
import { generateSecret, powMod, encrypt, dencrypt } from './algo';
import { MessagesService } from './messages.service';
import * as CryptoJS from 'crypto-js';

@Injectable()

export class ChatService{

    constructor(private messageService: MessagesService) { }

    encryptData(data, secret) {
        try {
            return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
        } catch (e) {
            console.log(e);
        }
    }

    decryptData(data, secret) {
        try {
            const bytes = CryptoJS.AES.decrypt(data, secret);
            if (bytes.toString()) {
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    private socket = io("http://localhost:3000");

    joinRoom(data)
    {
        this.socket.emit('join',data);
    }

    newUserJoined()
    {
        let observable = new Observable<{message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data){
        this.socket.emit('leave',data);
    }

    userLeftRoom(){
        let observable = new Observable<{message:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data, roomSecret)
    {
        data.message = this.encryptData(data, roomSecret);
        this.messageService.createMessage(data.message, data.room);
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}