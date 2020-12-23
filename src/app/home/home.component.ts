import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ChatService } from '../shared/chat.service';
import { RoomService } from '../shared/room/room.service';
import { dencrypt, generateSecret, powMod } from '../shared/algo';
import { MessagesService } from '../shared/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails;
  user:String;
  room:String;
  userIsJoined: boolean = false;
  messageText:String;
  messageArray:Array<String> = [];
  roomsArray:Array<String> = [];
  roomSecret: any;
  my_secret: any;
  my_P: any;
  my_key: any;
  constructor(private chatService: ChatService, private userService: UserService, private roomService: RoomService,
    private messageService: MessagesService, private toastr: ToastrService, private router: Router){
      this.my_secret = generateSecret();
      this.my_P = 1234;
      this.my_key = powMod(1234, this.my_secret, this.my_P);
  }

  join(){
    this.userIsJoined = true;
    this.chatService.joinRoom({user:this.userDetails.userName, room:this.room});
    this.messageService.getAllMessages(this.room).subscribe(
      (res: any) => {
        this.roomSecret = this.roomsArray.find(x => x["roomName"] == this.room)["id"];
        var messages = res.map(x => x.stringMessage);
        for (var mes in messages){
          var decrypted = this.chatService.decryptData(messages[mes], this.roomSecret);
          this.messageArray.push(decrypted.message);
        }
      }
    )
  }

  leave(){
    this.userIsJoined = false;
    this.messageArray = [];
    this.chatService.leaveRoom({user:this.userDetails.userName, room:this.room});
  }

  sendMessage()
  {
    this.roomSecret = this.roomsArray.find(x => x["roomName"] == this.room)["id"];
    var message = this.userDetails.userName + ": " + this.messageText;
      this.chatService.sendMessage({message: message, room:this.room}, this.roomSecret);
      this.messageText = '';
  }
  ngOnInit() {
    this.chatService.newUserJoined()
    .subscribe(data=>this.messageArray.push(data.message));

    this.chatService.userLeftRoom()
    .subscribe(data=>this.messageArray.push(data.message));

    this.chatService.newMessageReceived()
    .subscribe(data=>{
      this.roomSecret = this.roomsArray.find(x => x["roomName"] == this.room)["id"];
      data.message = this.chatService.decryptData(data.message, this.roomSecret).message;
      this.messageArray.push(data.message);
    });

    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res;
      },
      err => {
        this.toastr.error('Error', err);
      }
    )

    this.roomService.getAllRooms().subscribe(
      (res: any) => {
        this.roomsArray = res;
      }
    );
  }

}
