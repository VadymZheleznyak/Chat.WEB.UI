import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('token'))
      this.userService.userIsAuth = true;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
    this.userService.userIsAuth = false;
  }

}
