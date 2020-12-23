import { Component, OnInit } from '@angular/core';
import { RoomService } from '../shared/room/room.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private roomService: RoomService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  resetForm(){
    this.roomService.initializeFormGroup();
  }

  onSubmit(){
    this.roomService.createRoom().subscribe(
      res => {
        if(res){
          this.toastr.success('Submitted successfully', 'Room Register');
          this.onClose();
        }
      },
      err => {
        this.toastr.error('Error', err);
      }
    );
  }

  onClose(){
    this.roomService.form.reset();
    this.roomService.initializeFormGroup();
    this.router.navigate(['/']);
  }
}
