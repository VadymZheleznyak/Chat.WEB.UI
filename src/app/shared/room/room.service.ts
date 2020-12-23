import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Room } from './room.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  rooms: Room[];
  readonly rootURL = 'https://localhost:44397/api/room/';

  form: FormGroup = new FormGroup({
    Id: new FormControl(""),
    RoomName: new FormControl('', Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      Id: "",
      RoomName: ''
    });
  }

  constructor(private http: HttpClient) { }

  createRoom(){
    this.form.controls['Id'].setValue("00000000-0000-0000-0000-000000000000");
    return this.http.post(this.rootURL, this.form.value);
  }

  deleteRoom(Id){
    return this.http.delete(this.rootURL+Id);
  }

  getAllRooms(){
    return this.http.get(this.rootURL);
  }
}
