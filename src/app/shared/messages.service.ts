import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: string[];
  readonly rootURL = 'https://localhost:44397/api/message/';

  constructor(private http: HttpClient) { }

  createMessage(message, roomName){
    var model = { Message: message, RoomName : roomName};
    const headers = new HttpHeaders().set('Content-Type','application/json');
    this.http.post(this.rootURL, JSON.stringify(model), {headers : headers}).subscribe();
  }

  getAllMessages(room){
    return this.http.get(this.rootURL + "?roomName=" + room);
  }
}
